import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useReservedNFTs from '../hooks/useReservedNFTs'

import NFTCard from '../components/Reservations/NFTCard'
import NFTPopup from '../components/Reservations/NFTPopup'

const Reservation: React.FC<{}> = () => {
  const { name: contractName } = useParams()
  const { data, error } = useReservedNFTs(contractName as string)
  const [allImages, setAllImages] = useState<Array<number>>();
  const [selectedNFT, setSelectedNFT] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    ;(async () => {
      setAllImages(data.open);
    })()
  }, [data])

  useEffect(() => {
    if (showModal && document.getElementById("modal-container") !== null) {
      document.getElementById("modal-container")!.style.display = 'block'
    } else if (!showModal && document.getElementById("modal-container") !== null){
      document.getElementById("modal-container")!.style.display = 'none'
    } else {
      return;
    }
  },[showModal])


  if (!data && !error) {
    return null;
  }

  if (!data) {
    return null;
  }
  
  const handleSelectNFT = (index: number) => {
      setSelectedNFT(index); 
      handleOpen();
  }

  return (
      <div className="w-full flex flex-col p-5 items-center">
          <div className="grid grid-cols-3">
          {contractName && allImages && 
          allImages.map(i => 
            <NFTCard collection={contractName} index={i} onSelect={handleSelectNFT}/>)
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