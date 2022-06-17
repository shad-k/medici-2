import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NFTCard from '../components/Reservations/NFTCard'
import NFTPopup from '../components/Reservations/NFTPopup'

const Reservation: React.FC<{}> = () => {
  const { name: contractName } = useParams()
  const [allImages, setAllImages] = useState<Array<number>>();
  const [selectedNFT, setSelectedNFT] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    ;(async () => {
      const collection_size = 559;
      const arr = Array.from({length: collection_size}, (_, i) => i + 1)
      setAllImages(arr);
    })()
  }, [contractName])

  useEffect(() => {
    if (showModal) {
      document.getElementById("modal-container")!.style.display = 'block'
    } else {
      document.getElementById("modal-container")!.style.display = 'none'
    }
  },[showModal])

  const handleSelectNFT = (index: number) => {
      setSelectedNFT(index); 
      handleOpen();
  }

  return (
      <div className="w-full flex flex-col p-5 items-center">
          <div className="grid grid-cols-3">
          {contractName && allImages && 
          allImages.map(i => 
            <NFTCard collection={contractName} index={i} onSelect={handleSelectNFT}/>
            )
          }
          </div>
          <div id="modal-container" className="flex items-center justify-center text-center h-screen">
          {contractName && selectedNFT && 
            <NFTPopup showModal={showModal} handleClose={handleClose} collection={contractName} selected={selectedNFT}/>
          }
          </div>
      </div> 
  )
}

export default Reservation