import React, {useEffect, useState} from 'react'
import { useReward } from 'react-rewards';

import { getMerkleRoot, generateNewContract } from '../utils/web3'
import { parseData } from '../utils/parse'

import useWallet from '../hooks/useWallet'
import type { WalletState } from '@web3-onboard/core'

import { BigNumber, utils } from 'ethers'
import { ContractCreationProps } from '../model/types'

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

  const [ContractCreationSuccess, setContractCreationSuccess] = useState<boolean>(false)

  const { reward, isAnimating } = useReward('SubmitButton', 'confetti');

  const MAX_COLLECTION_SIZE = 1000

  useEffect(() => {
    if (CollectionTitle && CollectionSymbol && CollectionSize && FloorPrice && MaxMintsPerPerson && MasterAddress && WhitelistStrData && wallet) {
      setAllFieldsValid(true)
    } else {
      setAllFieldsValid(false)
    }
  }, [AllFieldsValid, setAllFieldsValid, CollectionTitle, CollectionSymbol, CollectionSize, FloorPrice, MaxMintsPerPerson, MasterAddress, WhitelistStrData])

  useEffect(() => {
    if (ContractCreationSuccess) {
      reward();
    } else {
      return
    }
  })
  async function generateSmartContract() {
    const [merkleResult] = await Promise.all([
        (async () => {
          const parseResult = await parseData(WhitelistStrData!);
          const merkleResult = await getMerkleRoot(parseResult);
          return merkleResult;
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

    return generateNewContract(newContractProps);
}

  async function handleSubmit() {
      if (!AllFieldsValid) {
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
        <div className="w-3/5 mx-auto h-full flex flex-col mt-10">
        <h1 className="text-3xl mt-10">Demo</h1>
        <br></br>
        <form>
          <p> Title </p>
            <input type="text" className="m-4 p-2 text-black" onChange={(event) => setCollectionTitle(event.target.value)}/>
            <br></br>
          <p> Symbol </p>
            <input type="text" className="m-4 p-2 text-black" onChange={(event) => setCollectionSymbol(event.target.value)}/>
          <br></br>
          <p> Collection Size </p>
            <input type="number" className="m-4 p-2 text-black" placeholder="10" step="1" max={MAX_COLLECTION_SIZE} onChange={(event) => setCollectionSize(parseInt(event.target.value))}/>
            <br></br>
          <p> Floor Price </p>
            <input type="number" className="m-4 p-2 text-black" placeholder="0.001" onChange={(event) => setFloorPrice(utils.parseUnits(event.target.value, "ether"))}/>
            <br></br>
          <p> Maximum Mints per Person </p>
          <input type="number" className="m-4 p-2 text-black" placeholder="10" step ="1" onChange={(event) => setMaxMintsPerPerson(parseInt(event.target.value))}/>
          <br></br>
          <p> Master Address </p>
            <input type="text" className="m-4 p-2 text-black" onChange={(event) => {
              try {
                const masterAddress = utils.getAddress(event.target.value)
                setMasterAddress(masterAddress);
              } catch {
                alert("Please enter a valid wallet address")
              }
            }}/>
            <br></br>
           <p> CSV File </p>
            <input type="file" className="m-2 p-2" id="addressesCSV" onChange={(event) => setWhitelistStrData(event.target.files![0])}/>
        </form>
        OR CSV Upload
        <textarea className="text-black p-3 m-3" id="whitelistTextArea" placeholder="Copy paste addresses here!" onChange={(event) => setWhitelistStrData(event?.target.value)}></textarea>
        <button id="SubmitButton" className="mt-10 order-3 px-5 py-2 w-1/5 rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed" onClick={handleSubmit}>Submit</button>
        </div> 
    );
}

export default Demo
