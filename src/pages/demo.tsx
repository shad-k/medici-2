import React, {useState} from 'react'
import { parseData } from '../utils/parse'
import { getMerkleRoot } from '../utils/web3'
import useWallet from '../hooks/useWallet'

const Demo: React.FC<{}> = () => {
  const { wallet, connecting, connect } = useWallet()
  const connectedWallet = wallet?.accounts[0]

  const [ whitelistStrData, setWhitelistStrData ] = useState<string | File>()

//   async function generateSmartContract() {
//     const [[parseResult, merkleResult]] = await Promise.all([
//         (async () => {
//           const { success, parseResult } = await parseData(whitelistStrData!);
//           const { success, merkleroot } = await getMerkleRoot(result);
//           return [parseResult, merkleResult];
//         })(),
//     ]);
// }

  async function handleSubmit() {
      if (!whitelistStrData) {
          alert("Please input something!")
      } 
      
      else {
          // const result = ContractCreationSuccess();
          const { success, result } = await parseData(whitelistStrData);
          if (!success) {
            console.log("error parsing!")
          } else {
            (document.getElementById("SubmitButton") as HTMLButtonElement).disabled = true;
            console.log(result);
            const { success, merkleroot } = await getMerkleRoot(result);
          }
      }
  }

  return (
        <div className="w-3/5 mx-auto h-full flex flex-col mt-10">
        <h1>Demo</h1>
        <form>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="addressesCSV" onChange={(event) => setWhitelistStrData(event.target.files![0])}/>
        </form>
        OR
        <textarea className="text-black p-3" id="whitelistTextArea" placeholder="Copy paste addresses here!" onChange={(event) => setWhitelistStrData(event?.target.value)}>
        </textarea>
        <button id="SubmitButton" className="mt-10 order-3 px-5 py-2 w-1/5 rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed" onClick={handleSubmit}>Submit</button>
        </div> 
    );
}

export default Demo
