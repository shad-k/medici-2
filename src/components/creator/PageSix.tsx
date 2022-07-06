import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import { useReward } from 'react-rewards';
import useWallet from '../../hooks/useWallet'
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import { Contract } from '../../model/types';
import { CONFIG } from '../../utils/config';
import { isValidAddress, generateNewContract, whitelist, getNewLaunchedContract, readyToTransact } from '../../utils/web3'
import { BsFillCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs'

const PageSix: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
  const localenv = CONFIG.DEV;
  const { wallet, connect, connectedChain, setChain } = useWallet();

  const [showModal, setShowModal] = useState(false);
  const [isValidMasterAddress, setIsValidMasterAddress] = useState<boolean>(false);
  const [ContractCreationResult, setContractCreationResult] = useState<Contract>()
  const [ContractCreationSuccess, setContractCreationSuccess] = useState<boolean>(false)
  const [etherscanURL, setEtherscanURL] = useState<string>()
  
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const onSubmit = async () => {
    console.log(data);
    try {
      await readyCheck();
      handleOpen();
      await generateSmartContract()
    } catch {
      alert("Something went wrong!")
    }
  }

  const readyCheck = async () => {
    return await readyToTransact(wallet, connect, setChain);
  }
    
  const generateSmartContract = async () => {
    try {
      console.log(data);
      if (await readyCheck()) {
        if (connectedChain!.id === '0xa') {
          setEtherscanURL('https://optimistic.etherscan.io/tx/')
        } else {
          setEtherscanURL('https://goerli.etherscan.io/tx/')
        }
        await generateNewContract(
          wallet,
          data.merkleRoot,
          { 
            name: data.name,
            symbol: data.symbol,
            baseuri: data.baseURI,
            maxSupply: data.maxSupply,
            price: data.price,
            maxMintsPerPerson: parseInt(data.maxMintsPerPerson),
            masterAddress: data.masterAddress,
            claimStartBlock: data.claimStartBlock,
            mintStartBlock: data.mintStartBlock
          });
        const result = await getNewLaunchedContract(data.masterAddress, wallet);
        setContractCreationResult(result);
        console.log("Get new launched contract " + result.name);
        await whitelist(data.name, connectedChain!.id, data.whitelistedAddresses, data.merkleRoot);
        console.log("Done setting whitelist!")
        setContractCreationSuccess(true);
      }
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

  const addressCheck = async (address: string) => {
    try {
      const addressCheck = isValidAddress(address);
      handleInputData("masterAddress", addressCheck);
      setIsValidMasterAddress(true)
    } catch {
      setIsValidMasterAddress(false)
    }
  }

  useEffect(() => {
    if (wallet) {
      const address = (document.getElementById("input-owner-address") as HTMLInputElement).value;
      addressCheck(address);
    }
  }, [wallet])
  

    return (
    <div className="w-full flex flex-col items-center p-10 h-screen">
        <div className="text-center w-4/5">
            <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-[#9403fc] font-semibold">Finally...</h1>
            <h2 className="text-zinc-500">Just a few more details needed for launch!</h2>
        </div>
        <div className="space-y-4 w-full md:w-2/5 m-10">
          <div className="text-left">
            <label htmlFor="input-price" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Price</label>
            <input id="input-price" type="number" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("price", event.target.value)}/>
          </div>
          <div className="text-left">
            <label htmlFor="input-max-per-wallet" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Max # of Mints per Wallet</label>
            <input id="input-max-per-wallet" type="number" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("maxMintsPerPerson", event.target.value)}/>
          </div>
          <div className="text-left">
            <label htmlFor="input-claim-block" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Claim Start Block</label>
            <input id="input-claim-block" type="number" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("claimStartBlock", event.target.value)}/>
          </div>
          <div className="text-left">
            <label htmlFor="input-mint-block" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Mint Start Block</label>
            <input id="input-mint-block" type="number" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("mintStartBlock", event.target.value)}/>
          </div>
          <div className="text-left">
            <label htmlFor="input-owner-address" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Owner address</label>
            <div className="inline-flex w-full gap-2">
              <input id="input-owner-address" type="text"  defaultValue={wallet?.accounts[0].address} className="w-11/12 text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => addressCheck(event.target.value)}/>
              {isValidMasterAddress ? <BsFillCheckSquareFill className="mt-3 flex justify-end" size="30px" color="green"/> : <BsFillXSquareFill className="mt-3" size="30px" color="#F47174"/>}
            </div>
          </div>
        </div>
        <div className="block">
          <button className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[100px]" onClick={onSubmit}>Let's go!</button>
        </div>
        <div id="modal-container" className="flex items-center justify-center text-center h-screen">
          <Modal
            open={showModal}
            onClose={handleClose}
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
            href={etherscanURL + ContractCreationResult.txhash}><span className="bg-medici-purple text-white  p-3 rounded-3xl w-2/5 min-w-[100px]">Etherscan</span></a> : <CircularProgress sx={{color: '#B81CD4'}}/>}
          </div>
          </Modal>
      </div>
    </div>
    );
}
export default PageSix
