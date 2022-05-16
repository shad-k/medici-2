import React, {useEffect, useState} from 'react'
import { useReward } from 'react-rewards';

import { getMerkleRoot, generateNewContract } from '../utils/web3'
import { parseData } from '../utils/parse'

import useWallet from '../hooks/useWallet'
import { BigNumber, utils } from 'ethers'
import { ContractCreationProps } from '../model/types'

import { BsFillCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs'

const Demo: React.FC<{}> = () => {
  const { wallet, connecting, connect } = useWallet()

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
    if (CollectionTitle && CollectionSymbol && CollectionSize && FloorPrice && MaxMintsPerPerson && MasterAddress && WhitelistStrData) {
      setAllFieldsValid(true)
    } else {
      setAllFieldsValid(false)
    }
  }, [AllFieldsValid, setAllFieldsValid, CollectionTitle, CollectionSymbol, CollectionSize, FloorPrice, MaxMintsPerPerson, MasterAddress, WhitelistStrData])


  function addressCheck(address: string) {
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
    const [merkleResult] = await Promise.all([
        (async () => {
          const parseResult = await parseData(WhitelistStrData!);
          const { success, data } = await getMerkleRoot(parseResult);

          if (success) {
            return data;
          } else {
            console.log("failure, rejecting now")
            return Promise.reject(data)
          }
          
        })(),
    ]);
    
    const newContractProps: ContractCreationProps = {
      callerWallet: wallet!,
      merkleRoot: merkleResult,
      name: CollectionTitle!,
      symbol: CollectionSymbol!,
      baseuri: '{}',
      maxSupply: CollectionSize!,
      price: FloorPrice!,
      maxMintsPerPerson: MaxMintsPerPerson!,
      masterAddress: MasterAddress!
    }

    console.log(newContractProps)
    return generateNewContract(newContractProps);
}

  async function handleSubmit() {
      if (!AllFieldsValid || !wallet) {
          alert("Missing some fields! Please double check your input or make sure your wallet is connected.")
      }
      else {
        try {
          await generateSmartContract();
          setContractCreationSuccess(true);
        } catch {
          alert("Something has gone wrong!")
        }
      }
  }

  return (
        <div className="w-4/5 md:w-11/12 lg:w-9/12 mx-auto h-full flex flex-col mt-10">
        <h1 className="text-3xl md:text-4xl mt-10">Regulus Collection Creator Demo</h1>
        <br></br>
        <h2 className="text-lg">Thanks for trying Regulus by Medici Labs! Fill in the information below to create your project and generate a smart contract.</h2>
        <br></br>
        <form>
          <div className="grid md:grid-cols-3 mt-10 ml-10 md:ml-0 w-full">
            <div className="min-w-fit">
              <p>Title</p>
              <input type="text" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="Collection Title" onChange={(event) => setCollectionTitle(event.target.value)}/>
              <p>Symbol</p>
              <input type="text" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="(TOKEN)" onChange={(event) => setCollectionSymbol(event.target.value)}/>
            </div>
            <div className="min-w-fit">
              <p> Collection Size </p>
                <input type="number" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="10" step="1" max={MAX_COLLECTION_SIZE} onChange={(event) => setCollectionSize(parseInt(event.target.value))}/>
              <p> Floor Price </p>
                <div className="inline-flex w-full">
                <input type="number" className="rounded-sm my-2 p-2 mr-2 text-black w-4/5 md:w-auto" placeholder="0.001" onChange={(event) => setFloorPrice(utils.parseUnits(event.target.value, "ether"))}/>
                <p className="mt-3 text-xl md:text-2xl">ETH</p>
                </div>
            </div>
            <div className="min-w-fit">
              <p> Maximum Mints per Person </p>
              <input type="number" className="rounded-sm my-2 p-2 text-black w-4/5 md:w-auto" placeholder="10" step ="1" max={CollectionSize} onChange={(event) => setMaxMintsPerPerson(parseInt(event.target.value))}/>
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
