import React, {useEffect, useState} from 'react'
import { useReward } from 'react-rewards';

import { getMerkleRoot, generateNewContract, whitelist, getNewLaunchedContract } from '../utils/web3'
import { parseData } from '../utils/parse'

import useWallet from '../hooks/useWallet'
import { BigNumber, utils } from 'ethers'
import { CONFIG } from '../utils/config';

import { BsFillCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs'

const Demo: React.FC<{}> = () => {
  const localenv = CONFIG.DEV;
  const { wallet, connecting, connect, connectedChain, setChain } = useWallet()

  const [CollectionTitle, setCollectionTitle] = useState<string>()
  const [CollectionSymbol, setCollectionSymbol] = useState<string>()
  const [CollectionSize, setCollectionSize] = useState<number>()
  const [FloorPrice, setFloorPrice] = useState<BigNumber>()
  const [MaxMintsPerPerson, setMaxMintsPerPerson] = useState<number>()
  const [MasterAddress, setMasterAddress] = useState<string>()
  const [WhitelistStrData, setWhitelistStrData] = useState<string | File>()

  const [AllFieldsValid, setAllFieldsValid] = useState<boolean>(false)
  const [isValidMasterAddress, setIsValidMasterAddress] = useState<boolean>(false)
  const [ContractCreationSuccess, setContractCreationSuccess] = useState<boolean>(false)

  const { reward, isAnimating } = useReward('SubmitButton', 'confetti');

  const MAX_COLLECTION_SIZE = 1000

  useEffect(() => {
    if (CollectionTitle && CollectionSymbol && CollectionSize && (CollectionSize > 0) && FloorPrice && (FloorPrice.gte(0)) && MaxMintsPerPerson && (MaxMintsPerPerson > 0) && MasterAddress && WhitelistStrData) {
      setAllFieldsValid(true)
    } else {
      setAllFieldsValid(false)
    }
  }, [AllFieldsValid, setAllFieldsValid, CollectionTitle, CollectionSymbol, CollectionSize, FloorPrice, MaxMintsPerPerson, MasterAddress, WhitelistStrData])


const readyToTransact = async (): Promise<boolean> => {
  if (!wallet) {
      await connect({});
  }
  return setChain({ chainId: localenv.network.id })
}

const addressCheck = (address: string) => {
      try {
        const addressCheck = utils.getAddress(address);
        setMasterAddress(addressCheck);
        setIsValidMasterAddress(true)
      } catch {
        setMasterAddress("")
        setIsValidMasterAddress(false)
      }
  }


  // useEffect(() => {
  //   if (ContractCreationSuccess) {
  //     reward();
  //   } else {
  //     return
  //   }
  // })

  async function generateSmartContract() {
      try {
        const parsedData = await parseData(WhitelistStrData!)
        const merkleRoot = await getMerkleRoot(parsedData)
        console.log(merkleRoot)
        if (await readyToTransact()) {
          const contractCreationResult = await generateNewContract(
            wallet,
            merkleRoot,
            { 
              name: CollectionTitle!,
              symbol: CollectionSymbol!,
              baseuri: '{}',
              maxSupply: CollectionSize!,
              price: FloorPrice!,
              maxMintsPerPerson: MaxMintsPerPerson!,
              masterAddress: MasterAddress!
            })
          console.log(contractCreationResult)
          await whitelist(
          { 
            "project": CollectionTitle!,
            "symbol": CollectionSymbol!,
            "ERC721Contract": contractCreationResult.contractaddress,
            "ownerAddress": MasterAddress!,
            "whitelistedAddresses": parsedData,
            "merkleRoot": merkleRoot
          })

          const getNewContractInstance = await getNewLaunchedContract(MasterAddress!, CollectionTitle!, CollectionSymbol!);
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
      if (!AllFieldsValid || !wallet) {
          alert("Missing some fields! Please double check your input or make sure your wallet is connected.")
      }
      else {
        await generateSmartContract();
        setContractCreationSuccess(true);
      }
  }

  return (
        <div className="w-4/5 md:w-11/12 lg:w-9/12 mx-auto h-full flex flex-col mt-10">
        <h1 className="text-3xl md:text-4xl mt-10">Regulus Collection Creator Demo</h1>
        <br></br>
        <h2 className="text-lg">Thanks for trying Regulus by Medici Labs! Fill in the information below to create your project and generate a smart contract.</h2>
        <br></br>
        <form id="DemoForm">
          <div className="grid md:grid-cols-3 mt-10 ml-10 md:ml-0 w-full">
            <div className="min-w-fit">
              <p>Title</p>
              <input type="text" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="Collection Title" onChange={(event) => setCollectionTitle(event.target.value)}/>
              <p>Symbol</p>
              <input type="text" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="(TOKEN)" onChange={(event) => setCollectionSymbol(event.target.value)}/>
            </div>
            <div className="min-w-fit">
              <p> Collection Size </p>
                <input type="number" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="10" step="1" min="0" max={MAX_COLLECTION_SIZE} onChange={(event) => setCollectionSize(parseInt(event.target.value))}/>
              <p> Floor Price </p>
                <div className="inline-flex w-full">
                <input type="number" className="rounded-sm my-2 p-2 mr-2 text-black w-4/5 md:w-auto" placeholder="0.001" onChange={(event) => setFloorPrice(utils.parseUnits(event.target.value, "ether"))}/>
                <p className="mt-3 text-xl md:text-2xl">ETH</p>
                </div>
            </div>
            <div className="min-w-fit">
              <p> Maximum Mints per Person </p>
              <input type="number" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="10" step ="1" min="0" max={CollectionSize} onChange={(event) => setMaxMintsPerPerson(parseInt(event.target.value))}/>
              <p> Master Address </p>
                <div className="inline-flex w-full">
                  <input type="text" className="rounded-sm my-2 p-2 mr-3 text-black w-4/5 md:w-auto" onChange={(event) => {addressCheck(event.target.value)}}/>
                  {isValidMasterAddress ? <BsFillCheckSquareFill className="mt-3" size="30px" color="green"/> : <BsFillXSquareFill className="mt-3" size="30px" color="#F47174"/>}
                  <br></br>
                </div>
            </div>
          </div>
          <br></br>
          <div className="ml-20 md:ml-0">
          <p> Whitelist CSV File </p>
          <input className="mt-2" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="addressesCSV" onChange={(event) => setWhitelistStrData(event.target.files![0])}/>
          </div>
        </form>
        <br></br>
        <p className="ml-10 md:ml-0">OR Whitelist CSV Input</p>
          <div className="flex flex-col items-center md:items-start">
            <textarea className="text-black p-3 mt-3 w-8/12 md:w-3/5 h-40 md:ml-0 rounded-sm" id="whitelistTextArea" placeholder="Copy paste addresses here!" onChange={(event) => setWhitelistStrData(event.target.value)}></textarea>
            <button id="SubmitButton" className="mt-5 order-3 px-5 py-2 w-1/5 min-w-[90px] max-w-[100px] rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed" onClick={handleSubmit}>Submit</button>
          </div>
        </div> 
    );
}

export default Demo