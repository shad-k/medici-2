import React, { useState } from 'react'
import { StepperFormProps } from '../../model/types';
import { getMerkleRoot, readyToTransact } from '../../utils/web3'
import { parseData } from '../../utils/parse'
import useWallet from '../../hooks/useWallet'

const PageFive: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const { wallet, connect, setChain } = useWallet();
    const [allowlistStrData, setAllowlistStrData] = useState<any>();

    const onSubmit = async () => {
      if (allowlistStrData) {
        console.log(allowlistStrData);
        try {
          const parsedStrings = await parseData(allowlistStrData);
          await handleInputData("whitelistedAddresses", parsedStrings);
          const merkleRoot = await getMerkleRoot(parsedStrings);
          await handleInputData("merkleRoot", merkleRoot);
          // console.log(data);
          nextStep();
        } catch {
          alert("Allowlist upload failed!")
        }
      } else {
        console.log("no allow list provided")
        if (!wallet) {
          alert("Please connect your wallet and try again!")
          await readyToTransact(wallet, connect, setChain);
        }
        else {
          /* medici wallet address as second address for merkle tree */
          const parsedStrings = [wallet.accounts[0].address, '0xABeF33AA09593Ee532Cf203074Df2f19f9C61f8f'];
          await handleInputData("whitelistedAddresses", parsedStrings);
          const merkleRoot = await getMerkleRoot(parsedStrings);
          await handleInputData("merkleRoot", merkleRoot);
          nextStep();
        }
      }
    }

    const onUploadAllowlist = () => {
      document.getElementById("menu-options")!.style.display = 'none';
      document.getElementById("allowlist-options")!.style.display = 'block';
      document.getElementById("back-button")!.style.display = 'block';
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
        </div>
        <div id="menu-options" className="flex flex-col space-y-4 m-10 items-center">
        <button className="bg-[#2e2c38] hover:bg-gradient-to-br hover:from-medici-purple hover:to-medici-purple-dark focus:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]" onClick={onUploadAllowlist}>Yes</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br hover:from-medici-purple hover:to-medici-purple-dark focus:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]">No</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br hover:from-medici-purple hover:to-medici-purple-dark focus:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]">What's that?</button>
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
    </div>
    );
}
export default PageFive
