import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import Modal from '@mui/material/Modal';
import apiClient from '../../utils/apiClient';
import { CONFIG } from '../../utils/config';

const PageFive: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const [allowlistStrData, setAllowlistStrData] = useState<any>();

    const onSubmit = () => {
        nextStep();
    }

    const onUploadAllowlist = () => {
      document.getElementById("menu-options")!.style.display = 'none';
      document.getElementById("allowlist-options")!.style.display = 'block';
    }

    return (
    <div className="w-full flex flex-col items-center p-10 h-screen">
        <div className="text-center w-4/5 md:mt-52">
            <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Does your collection have an allowlist?</h1>
            <h2 className="text-zinc-500">Regulus supports allowlisting!</h2>
        </div>
        <div id="menu-options" className="flex flex-col space-y-4 m-10 items-center">
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[500px]" onClick={onUploadAllowlist}>Yes</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[500px]">No</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[500px]">What's that?</button>
        </div>
        <div id="allowlist-options" className="m-10 items-center hidden space-y-10 w-3/5">
          <div id="allowlist-upload">
          <input
              type="file"
              name="collectionImageData"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="collectionImageDataField"
              style={{'display': 'none'}}
              onChange={(event) => setAllowlistStrData(event.target.files![0])}
          />
          <label htmlFor="collectionImageDataField">
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
        <div className="flex justify-end w-full absolute bottom-24 right-10">
          <button className="text-[#8E00FF] text-2xl" onClick={nextStep}>Next</button>
        </div>
    </div>
    );
}
export default PageFive