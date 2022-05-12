import React, {useEffect, useState} from 'react'
import { parseData } from '../utils/parse'
import { BigNumber, utils } from 'ethers'
import { getMerkleRoot, generateContract } from '../utils/web3'
import useWallet from '../hooks/useWallet'

const Demo: React.FC<{}> = () => {
  const { wallet, connecting, connect } = useWallet()
  const connectedWallet = wallet?.accounts[0]

  const [CollectionTitle, setCollectionTitle] = useState<string>()
  const [CollectionSize, setCollectionSize] = useState<number>()
  const [FloorPrice, setFloorPrice] = useState<BigNumber>()
  const [MasterAddress, setMasterAddress] = useState<string>()
  const [WhitelistStrData, setWhitelistStrData] = useState<string | File>()
  const [AllFieldsValid, setAllFieldsValid] = useState<boolean>(false)

  const MAX_COLLECTION_SIZE = 1000

  useEffect(() => {
    if (CollectionTitle && CollectionSize && FloorPrice && MasterAddress && WhitelistStrData) {
      setAllFieldsValid(true)
    } else {
      setAllFieldsValid(false)
    }
  }, [AllFieldsValid, setAllFieldsValid, CollectionTitle, CollectionSize, FloorPrice, MasterAddress, WhitelistStrData])

  async function generateSmartContract() {
    const [[parseResult, merkleResult]] = await Promise.all([
        (async () => {
          // const { success, parseResult } = await parseData(whitelistStrData!);
          const parseResult = await parseData(WhitelistStrData!);
          const merkleResult = await getMerkleRoot(parseResult);
          return [parseResult, merkleResult];
        })(),
    ]);
}

  async function handleSubmit() {
      if (!AllFieldsValid) {
          alert("Missing some fields! Please double check your input")
      }
      else {
          const result = await parseData(WhitelistStrData!);
          console.log(result);

          // if (!success) {
          //   console.log("error parsing!")
          // } else {
          //   (document.getElementById("SubmitButton") as HTMLButtonElement).disabled = true;
          //   console.log(result);
          //   const { success, merkleroot } = await getMerkleRoot(result);
          // }
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
          <p> Collection Size </p>
            <input type="number" className="m-4 p-2 text-black" placeholder="10" step="1" max={MAX_COLLECTION_SIZE} onChange={(event) => setCollectionSize(parseInt(event.target.value))}/>
            <br></br>
          <p> Floor Price </p>
            <input type="number" className="m-4 p-2 text-black" placeholder="0.001" onChange={(event) => setFloorPrice(utils.parseUnits(event.target.value, "ether"))}/>
            <br></br>
          <p> MasterAddress </p>
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
        OR
        <textarea className="text-black p-3 m-4" id="whitelistTextArea" placeholder="Copy paste addresses here!" onChange={(event) => setWhitelistStrData(event?.target.value)}>
        </textarea>
        <button id="SubmitButton" className="mt-10 order-3 px-5 py-2 w-1/5 rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed" onClick={handleSubmit}>Submit</button>
        </div> 
    );
}

export default Demo
