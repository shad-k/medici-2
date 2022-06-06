import React, {useEffect, useState} from 'react'
import { StepperFormProps } from '../../model/types';
import validator from 'validator';
import { useReward } from 'react-rewards';

import { getMerkleRoot, generateNewContract, whitelist, getNewLaunchedContract } from '../../utils/web3'
import { parseData } from '../../utils/parse'

import useWallet from '../../hooks/useWallet'
import { BigNumber, utils } from 'ethers'
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import { Contract } from '../../model/types';
import { CONFIG } from '../../utils/config';


const ProjectDetails: React.FC<StepperFormProps> = ({
  nextStep,
  handleInputData,
  data
}) => {
    
    const localenv = CONFIG.DEV;
    const { wallet, connect, setChain } = useWallet()
    const [error, setError] = useState(false);
    
    const [ContractCreationResult, setContractCreationResult] = useState<Contract>()
    const [ContractCreationSuccess, setContractCreationSuccess] = useState<boolean>(false)
    const [WhitelistStrData, setWhitelistStrData] = useState<string | File>()

    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

  const readyToTransact = async (): Promise<boolean> => {
    if (!wallet) {
        await connect({});
    }
    return setChain({ chainId: localenv.network.id })
  }

  async function generateSmartContract() {
    try {
      const parsedData = await parseData(WhitelistStrData!)
      console.log(parsedData);
      const merkleRoot = await getMerkleRoot(parsedData)
      console.log("Merkle Root: " + merkleRoot)

      console.log(data);
      if (await readyToTransact()) {
        await generateNewContract(
          wallet,
          merkleRoot,
          { 
            name: data.name,
            symbol: data.symbol,
            baseuri: data.baseuri,
            maxSupply: data.maxSupply,
            price: data.price,
            maxMintsPerPerson: data.maxMintsPerPerson,
            masterAddress: data.masterAddress
          });
        const result = await getNewLaunchedContract(data.masterAddress);
        console.log(result);
        await whitelist(
        { 
          "project": data.name,
          "symbol": data.symbol,
          "ERC721Contract": result.contractaddress,
          "ownerAddress": data.masterAddress,
          "whitelistedAddresses": parsedData,
          "merkleRoot": merkleRoot
        })
        setContractCreationResult(result);
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


async function handleSubmit() {
    if (!wallet) {
        alert("Missing some fields! Please double check your input or make sure your wallet is connected.")
    }
    else {
      handleOpen();
      await generateSmartContract();
      setContractCreationSuccess(true);
    }
}

  return (
    <div className="w-full md:w-2/5 md:text-left flex flex-col mt-5">
          <label htmlFor="input-max-supply" className="block lg:text-2xl py-2">Max Supply</label>
          <input id="input-max-supply" type="number" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none" onChange={event => handleInputData("maxSupply", event.target.value)}/>
          <br></br>
              <label htmlFor="input-mints-pp" className="block lg:text-2xl py-2">Mints per Person</label>
              <input id="input-mints-pp" type="number" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none" onChange={event => handleInputData("maxMintsPerPerson", event.target.value)}/>
          <br></br>
            <label htmlFor="input-price" className="block lg:text-2xl py-2">Price</label>
                <input id="input-price" type="number" className="text-white md:text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none w-11/12" onChange={event => handleInputData("price", utils.parseUnits(event.target.value, "ether"))}/>
          <br></br>

          <div className="ml-20 md:ml-0">
          <p> Whitelist CSV File </p>
          <input className="mt-2" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="addressesCSV" onChange={(event) => setWhitelistStrData(event.target.files![0])}/>
          </div>
          <p className="ml-10 md:ml-0">OR Whitelist CSV Input</p>
          <div className="flex flex-col items-center md:items-start">
            <textarea className="text-black p-3 mt-3 w-8/12 md:w-3/5 h-40 md:ml-0 rounded-sm" id="whitelistTextArea" placeholder="Copy paste addresses here!" onChange={(event) => setWhitelistStrData(event.target.value)}></textarea>
          </div>
          <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]" onClick={handleSubmit}>Submit</button>
          </div>
          <div id="modal-container" className="flex items-center justify-center text-center h-screen">
          <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center">
            <h1 className="text-center text-2xl">Generating your Smart Contract</h1>
            <br></br>
            { (ContractCreationSuccess && ContractCreationResult) ? <a href={localenv.network.txEtherscanUrl + ContractCreationResult.txhash}><span className="bg-medici-purple text-white  p-3 rounded-3xl w-2/5 min-w-[100px]">Etherscan</span></a> : <CircularProgress sx={{color: '#B81CD4'}}/>}
          </div>
          </Modal>
      </div>
    </div>
  );
}

export default ProjectDetails
