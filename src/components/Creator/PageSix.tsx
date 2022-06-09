import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import Modal from '@mui/material/Modal';
import apiClient from '../../utils/apiClient';
import { CONFIG } from '../../utils/config';

const PageSix: React.FC<StepperFormProps> = ({
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
            <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Finally...</h1>
            <h2 className="text-zinc-500">Just a few more details needed for launch!</h2>
        </div>
        <div className="space-y-4 w-3/5 m-10">
          <div className="text-left">
            <label htmlFor="input-price" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Price</label>
            <input id="input-price" type="number" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("price", event.target.value)}/>
          </div>
          <div className="text-left">
            <label htmlFor="input-max-per-wallet" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Max # of Mints per Wallet</label>
            <input id="input-max-per-wallet" type="number" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("maxPerWallet", event.target.value)}/>
          </div>
          <div className="text-left">
            <label htmlFor="input-owner-address" className="block py-2 text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Owner address</label>
            <input id="input-owner-address" type="text" className="w-full text-zinc-500 text-2xl p-2 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => handleInputData("masterAddress", event.target.value)}/>
          </div>
        </div>
        <div className="block m-10">
          <button className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[100px]" onClick={onSubmit}>Let's go!</button>
        </div>
    </div>
    );
}
export default PageSix