import React, { useState, useEffect } from 'react'
import HomeMenu from '../components/home/HomeMenu'
import AlphaBanner from '../components/home/AlphaBanner'
import { Modal } from '@mui/material'

const Home: React.FC<{}> = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal)

useEffect(() => {
  toggleModal()

}, [])

useEffect(() => {
  if (showModal) {
    document.getElementById("modal-container")!.style.display = 'block'
  } else {
    document.getElementById("modal-container")!.style.display = 'none'
  }
},[showModal])

  return (
    <div className="pb-20">
      <div className="w-full flex flex-col p-5 items-center">
      <AlphaBanner/>
        <div className="whitespace-nowrap">
          <h1 className="text-center text-[34px] md:text-6xl font-semibold">
          ✨ <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">Launch Your Project</span> ✨
          </h1>
        </div>
        <br></br>
        <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-300">
        Create customizable NFT smart contracts and claim pages! 
        </span>
      <br></br>
      </div> 
      <HomeMenu/>
      <div id="modal-container" className="flex items-center justify-center text-center h-screen">
          <Modal
            open={showModal}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] text-white text-center rounded-2xl bg-zinc-400/5 backdrop-blur-lg border-white border-[1px] space-y-3 hero-collection flex flex-col items-center justify-center outline-none">
          <h1 className="text-3xl m-2">🚀 What's New 🚀</h1>
            <div className="space-y-3 w-4/5 mt-5">
              <p> 💫 ability to launch 1 - 1000 sized NFT collections</p>
              <p> 💫 ability to launch a custom mint page from one of our templates </p>
              <p> 💫 ability to manage contract and withdraw funds</p>
            </div>
          </div>
          </Modal>
      </div>
      </div>
  )
}

export default Home
