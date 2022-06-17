import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NFTCard from '../components/Reservations/NFTCard'

const Reservation: React.FC<{}> = () => {
  const { name: contractName } = useParams()
  const [allImages, setAllImages] = useState<Array<number>>();

  useEffect(() => {
    ;(async () => {
      const collection_size = 559;
      const arr = Array.from({length: collection_size}, (_, i) => i + 1)
      setAllImages(arr);
    })()
  }, [contractName])

  return (
      <div className="w-full flex flex-col p-5 items-center">
          <div className="grid grid-cols-3">
          {contractName && allImages && 
          allImages.map(i => 
            <NFTCard collection={contractName} index={i}/>
            )
          }
            {/* <NFTCard collection={contractName} index={1}/> */}
          </div>
      </div> 
  )
}

export default Reservation