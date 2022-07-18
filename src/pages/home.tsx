import React, { useState, useEffect, useCallback } from 'react'
import HomeMenu from '../components/home/HomeMenu'
import AlphaBanner from '../components/home/AlphaBanner'
import { Modal } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { RiCloseFill } from 'react-icons/ri'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Home: React.FC<{}> = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {setShowModal(!showModal)}
  const [visited, setVisited] = useLocalStorage("visited", false);

  const navigateAway = useCallback(() => {
    setVisited(true)
  }, [setVisited])
  
  useEffect(() => {
    // if user navigates away to a completely different site
    // or refreshes the page etc
    window.addEventListener("beforeunload", navigateAway);
  
    // if user navigates to another page on the same site
    return () => {
      navigateAway();
      window.removeEventListener("beforeunload", navigateAway);
    };
  }, [navigateAway]);
  

useEffect(() => {
  if (visited === false) {
    toggleModal()
  }
}, [visited])

useEffect(() => {
  if (showModal) {
    document.getElementById("modal-container")!.style.display = 'block'
  } else {
    document.getElementById("modal-container")!.style.display = 'none'
  }
}, [showModal, toggleModal])

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
          <div className="relative top-[20%] mx-auto p-5 w-4/5 text-white text-center rounded-2xl bg-zinc-400/5 backdrop-blur-lg border-white border-[1px] space-y-3 hero-collection flex flex-col items-center justify-center outline-none">
          <IconButton
          aria-label="close"
          onClick={toggleModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
          >
          <RiCloseFill color='white' />
        </IconButton>
          <h1 className="text-3xl m-2">🚀 What's New 🚀</h1>
            <div className="space-y-3 w-4/5 mt-5">
              <p> 💫 ability to launch 1 - 1000 sized NFT collections</p>
              <p> 💫 ability to launch a custom mint page from one of our templates </p>
              <p> 💫 ability to manage contract and withdraw funds</p>
            </div>
            <img src={`${process.env.PUBLIC_URL}/medici_demo_1.gif`} className="w-1/2"/>
          </div>
          </Modal>
      </div>
      </div>
  )
}

export default Home
