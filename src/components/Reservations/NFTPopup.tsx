import React, { useState } from 'react'
import useWallet from '../../hooks/useWallet';
import { makeReservation } from '../../utils/reservations';

import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const NFTPopup: React.FC<{showModal: boolean, handleClose: any, collection: string, selected: number}> = ({showModal, handleClose, collection, selected}) => {
  
  enum RESERVE_METHODS {
    email,
    wallet_address,
    ens,
  }
  const { wallet, connect, setChain } = useWallet();
  const [reserveMethod, setReserveMethod] = useState<RESERVE_METHODS>();
  const [reserveDetails, setReserveDetails] = useState<string>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [reserveSuccess, setReserveSuccess] = useState<boolean>();

  const onReserveMethodSelected = (reserveMethodInput: RESERVE_METHODS) => {
    setReserveMethod(reserveMethodInput);
    document.getElementById("menu-options")!.style.display = 'none';
    document.getElementById(`reserve-input-${reserveMethodInput}`)!.style.display = 'block';
  }

  const onBack = () => {
    document.getElementById(`reserve-input-${reserveMethod}`)!.style.display = 'none';
    setReserveDetails(undefined);
    setReserveMethod(undefined);
    document.getElementById("menu-options")!.style.display = 'flex';
  }

  const onSubmit = async () => {
    document.getElementById(`reserve-input-${reserveMethod}`)!.style.display = 'none';
    
    if (reserveDetails && reserveMethod !== null && reserveMethod !== undefined ) {
      setShowLoader(true);
      document.getElementById("reserve-status")!.style.display = 'block';
    
      try {
        const res = await makeReservation(collection, selected, reserveDetails, reserveMethod);
        setShowLoader(false);
        setReserveSuccess(true);
      } catch {
        setShowLoader(false);
        setReserveSuccess(false);
      }
    } else {
      alert("Please fill in all fields!")
    }
  }

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
    >
    <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none">
      <h1 className="text-2xl text-transparent tracking-wide bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold whitespace-nowrap">Reserve: {collection} #{selected}</h1>
      <div id="menu-options" className="flex flex-col items-center w-full space-y-2 mt-5">
        <p>How would you like to reserve this NFT?</p>
        <div className="w-3/5 space-y-2">
        <button className="bg-[#2e2c38] bg-gradient-to-br from-medici-purple to-medici-purple-dark p-2 rounded-3xl w-full" onClick={event => onReserveMethodSelected(RESERVE_METHODS.email)}>Email</button>
        <button className="bg-[#2e2c38] bg-gradient-to-br from-medici-purple to-medici-purple-dark p-2 rounded-3xl w-full" onClick={event => onReserveMethodSelected(RESERVE_METHODS.wallet_address)}>Wallet address</button>
        <button className="bg-[#2e2c38] bg-gradient-to-br from-medici-purple to-medici-purple-dark p-2 rounded-3xl w-full" onClick={event => onReserveMethodSelected(RESERVE_METHODS.ens)}>ENS</button>
        </div>
      </div>
      <div id="reserve-input-0" className="hidden mt-5">
        <label htmlFor="input-email" className="block py-2">Email address</label>
        <input id="input-email" type="email" className="w-full text-zinc-500 text-2xl p-1 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => setReserveDetails(event.target.value)}/>
        <div className="flex justify-between gap-6 mt-5">
          <button className="bg-medici-purple rounded-lg p-2" onClick={onBack}>Back</button>
          <button className="bg-medici-purple rounded-lg p-2" onClick={onSubmit}>Next</button>
        </div>
      </div>
      <div id="reserve-input-1" className="hidden mt-5">
        <label htmlFor="input-address" className="block py-2">Wallet address</label>
        <input id="input-address" type="text" className="w-full text-zinc-500 text-2xl p-1 rounded-lg bg-white border-2 border-zinc-300 outline-none " defaultValue={wallet?.accounts[0].address} onChange={event => setReserveDetails(event.target.value)}/>
        <div className="flex justify-between gap-6 mt-5">
          <button className="bg-medici-purple rounded-lg p-2" onClick={onBack}>Back</button>
          <button className="bg-medici-purple rounded-lg p-2" onClick={onSubmit}>Next</button>
        </div>
      </div>
      <div id="reserve-input-2" className="hidden mt-5">
        <label htmlFor="input-ens" className="block py-2">ENS name</label>
        <input id="input-ens" type="text" className="w-full text-zinc-500 text-2xl p-1 rounded-lg bg-white border-2 border-zinc-300 outline-none" onChange={event => setReserveDetails(event.target.value)}/>
        <div className="flex justify-between gap-6 mt-5">
          <button className="bg-medici-purple rounded-lg p-2" onClick={onBack}>Back</button>
          <button className="bg-medici-purple rounded-lg p-2" onClick={onSubmit}>Next</button>
        </div>
      </div>
      <div id="reserve-status" className="hidden mt-5 w-10/12">
      { showLoader && 
        <CircularProgress sx={{color: '#B81CD4'}}/>
      }
      { reserveSuccess ?
        <h1 className="text-center">Congratulations! You've just reserved this NFT!</h1> :
        <h1 className="text-center">Sorry, something went wrong...</h1>
      }
      </div>
    </div>
    </Modal>
    )
}

export default NFTPopup;