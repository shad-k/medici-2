import React, {useEffect, useState} from 'react'
import { StepperFormProps } from '../../model/types';
import validator from 'validator';
import { useReward } from 'react-rewards';

import { getMerkleRoot, generateNewContract, whitelist, getNewLaunchedContract } from '../../utils/web3'
import { parseData } from '../../utils/parse'

import useWallet from '../../hooks/useWallet'
import { BigNumber, utils } from 'ethers'
import { CONFIG } from '../../utils/config';


const ProjectDetails: React.FC<StepperFormProps> = ({
  nextStep,
  handleInputData,
  data
}) => {
    
    const localenv = CONFIG.DEV;
    const { wallet, connecting, connect, connectedChain, setChain } = useWallet()
    const [error, setError] = useState(false);
    const [ContractCreationSuccess, setContractCreationSuccess] = useState<boolean>(false)
    const [WhitelistStrData, setWhitelistStrData] = useState<string | File>()

  // after form submit validating the form data using validator
  const submitFormData = (e: any) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(data.name) ||
      validator.isEmpty(data.symbol) ||
      validator.isEmpty(data.masterAddress)
    ) {
      setError(true);
      alert("Please double check your input!");
    } else {
      nextStep();
    }
  };

  const readyToTransact = async (): Promise<boolean> => {
    if (!wallet) {
        await connect({});
    }
    return setChain({ chainId: localenv.network.id })
  }

  async function generateSmartContract() {
    try {
      const parsedData = await parseData(WhitelistStrData!)
      const merkleRoot = await getMerkleRoot(parsedData)
      console.log("Merkle Root: " + merkleRoot)

      console.log(data);
      if (await readyToTransact()) {
        const contractCreationResult = await generateNewContract(
          wallet,
          merkleRoot,
          { 
            name: data.name,
            symbol: data.symbol,
            baseuri: '{}',
            maxSupply: data.maxSupply,
            price: data.price,
            maxMintsPerPerson: data.maxMintsPerPerson,
            masterAddress: data.masterAddress
          })
        console.log(contractCreationResult)
        await whitelist(
        { 
          "project": data.name,
          "symbol": data.symbol,
          "ERC721Contract": contractCreationResult.contractaddress,
          "ownerAddress": data.masterAddress,
          "whitelistedAddresses": parsedData,
          "merkleRoot": merkleRoot
        })

        const getNewContractInstance = await getNewLaunchedContract(data.masteraddress!, data.name!, data.symbol!);
        console.log(getNewContractInstance);
        if (getNewContractInstance !== contractCreationResult.contractaddress) {
          throw new Error("Not matching")
        }
      }
    } catch {
        setContractCreationSuccess(false);
        alert("Something went wrong!")
    }
}


async function handleSubmit() {
    if (!wallet) {
        alert("Missing some fields! Please double check your input or make sure your wallet is connected.")
    }
    else {
      await generateSmartContract();
      setContractCreationSuccess(true);
    }
}

  return (
    <div className="w-full md:w-2/5 md:text-left flex flex-col mt-10">
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
            <button id="SubmitButton" className="mt-5 order-3 px-5 py-2 w-1/5 min-w-[90px] max-w-[100px] rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed" onClick={handleSubmit}>Submit</button>
          </div>
          <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]" onClick={submitFormData}>Next</button>
          </div>
    </div>
  );
}

export default ProjectDetails
