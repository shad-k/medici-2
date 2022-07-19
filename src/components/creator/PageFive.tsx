import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import { getMerkleRoot, readyToTransact, generateNewContract, getNewLaunchedContract, whitelist } from '../../utils/web3'
import { parseData } from '../../utils/parse'
import useWallet from '../../hooks/useWallet'
import { Contract } from '../../model/types';
import { Modal, CircularProgress } from '@mui/material';
import { utils } from 'ethers'

const PageFive: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const { wallet, connect, setChain, currentChain } = useWallet();
    const connectedWallet = wallet?.accounts[0]
    const [allowlistStrData, setAllowlistStrData] = useState<any>();
    const [hasAllowlist, setHasAllowlist] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [ContractCreationResult, setContractCreationResult] = useState<Contract>()
    const [ContractCreationSuccess, setContractCreationSuccess] = useState<boolean>(false)
    const toggleModal = () => setShowModal(!showModal)

    const generateSmartContract = async (merkleRoot: string, whitelistedAddresses: string[]) => {
      try {
          await generateNewContract(
            wallet,
            merkleRoot,
            { 
              name: data.name,
              symbol: data.symbol,
              baseuri: data.baseURI,
              maxSupply: data.maxSupply,
              price: "0.01",
              maxMintsPerPerson: 1,
              masterAddress: utils.getAddress(connectedWallet!.address),
              claimStartBlock: "0",
              mintStartBlock: "0"
          });
          const result = await getNewLaunchedContract(utils.getAddress(connectedWallet!.address), currentChain!);
          setContractCreationResult(result);
          await whitelist(data.name, currentChain!.hexId, whitelistedAddresses, merkleRoot);
          setContractCreationSuccess(true);
      } catch {
          setContractCreationSuccess(false);
          alert("Something went wrong!")
      }
    }
    
    useEffect(() => {
      if (showModal) {
        document.getElementById("modal-container")!.style.display = 'block'
      } else {
        document.getElementById("modal-container")!.style.display = 'none'
      }
    
    },[showModal])

    const onSubmit = async () => {
      if (allowlistStrData && hasAllowlist) {
        console.log(allowlistStrData);
        const parsedStrings = await parseData(allowlistStrData);
        const merkleRoot = await getMerkleRoot(parsedStrings);
        toggleModal()
        await generateSmartContract(merkleRoot, parsedStrings)
      } else if (!hasAllowlist) {
        if (!wallet) {
          alert("Please connect your wallet and try again!")
        }
        else {
          /* medici wallet address as second address for merkle tree */
          const parsedStrings = [wallet.accounts[0].address, '0xABeF33AA09593Ee532Cf203074Df2f19f9C61f8f'];
          const merkleRoot = await getMerkleRoot(parsedStrings);
          toggleModal()
          await generateSmartContract(merkleRoot, parsedStrings)
        }
      }
    }

    const onUploadAllowlist = () => {
      document.getElementById("menu-options")!.style.display = 'none';
      document.getElementById("allowlist-options")!.style.display = 'block';
      document.getElementById("back-button")!.style.display = 'block';
      setHasAllowlist(true)
    }

    const onBack = () => {
      document.getElementById("menu-options")!.style.display = 'flex';
      document.getElementById("allowlist-options")!.style.display = 'none';
      document.getElementById("back-button")!.style.display = 'none';
    }

    return (
    <div className="w-full flex flex-col items-center p-10 h-screen">
        <div className="text-center w-4/5 mt-10 md:mt-52">
          <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-[#9403fc] font-semibold">Does your collection have an allowlist?</h1>
          <h2 className="text-zinc-500">Reward community members and fans with a guranteed mint!</h2>
        </div>
        <div id="menu-options" className="flex flex-col space-y-4 m-10 items-center">
        <button className="bg-[#2e2c38] hover:bg-gradient-to-br hover:from-medici-purple hover:to-medici-purple-dark focus:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]" onClick={() => setHasAllowlist(false)}>No</button>
        <button className="bg-[#2e2c38] hover:bg-gradient-to-br hover:from-medici-purple hover:to-medici-purple-dark focus:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]" onClick={onUploadAllowlist}>Yes</button>
          <a href="https://docs.medicilabs.xyz/docs/Minting/overview#allow-listing" target="_blank"  className="bg-[#2e2c38] hover:bg-gradient-to-br text-center from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]">What's that?</a>
        </div>
        <div id="allowlist-options" className="m-10 items-center hidden space-y-5 w-3/5">
          <div id="allowlist-upload">
          <input
              type="file"
              name="whitelistData"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="whitelistData"
              style={{'display': 'none'}}
              onChange={(event) => setAllowlistStrData(event.target.files![0])}
          />
          <label htmlFor="whitelistData">
              <div className="flex w-full h-2/5 items-center">
                  <span className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">Upload Allowlist</span>
              </div>
          </label>
          </div>
          <h1 className="text-center">OR</h1>
          <div id="allowlist-input">
            <textarea className="text-black p-3 w-full h-60 rounded-xl resize-none" id="whitelistTextArea" placeholder="Copy paste addresses here!" onChange={(event) => setAllowlistStrData(event.target.value)}></textarea>
          </div>
        </div>
        <div className="flex justify-end absolute bottom-24 right-10">
          <button className="text-[#8E00FF] text-2xl" onClick={onSubmit}>Next</button>
        </div>
        <div id="back-button" className="hidden justify-start absolute bottom-24 left-10">
          <button className="text-[#8E00FF] text-2xl" onClick={onBack}>Back</button>
        </div>
        <div id="modal-container" className="flex items-center justify-center text-center h-screen">
          <Modal
            open={showModal}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center">
            {(!ContractCreationResult) && <h1 id="modal-header" className="text-center text-2xl">Generating your Smart Contract</h1>}
            {(!ContractCreationResult) && <p id="modal-text">Our platform waits for two blocks to confirm your transaction, to ensure your transaction is secure</p>}
            <br></br>
            { (ContractCreationSuccess && ContractCreationResult) ? 
            <a 
            target="_blank"
            rel="noreferrer"
            href={`${currentChain!.etherscanUrl}/tx/${ContractCreationResult.txhash}`}><span className="bg-medici-purple text-white  p-3 rounded-3xl w-2/5 min-w-[100px]">Etherscan</span></a> : <CircularProgress sx={{color: '#B81CD4'}}/>}
          </div>
          </Modal>
      </div>
    </div>
    );
}
export default PageFive
