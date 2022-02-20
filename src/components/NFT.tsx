import { utils } from 'ethers'
import React from 'react'
import { MdVerified, MdTimer } from 'react-icons/md'

import { Collection, ListedNFT } from '../types'
import ethIcon from './eth-icon.svg'

const NFT: React.FC<{
  collection: Collection
  nft: ListedNFT
}> = ({ collection, nft }) => {
  const { image, tokenId } = nft
  const { name, verified, floor_price } = collection

  return (
    <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-lg">
      <img
        src={image}
        alt={`NFT ${tokenId}`}
        className="w-full h-64 object-cover"
      />
      <div className="text-black  font-bold p-2 border-b border-gray-300">
        <div className="flex items-center text-xs my-2">
          {name} {verified && <MdVerified className="ml-1" />}
        </div>
        <span className="font-bold">
          {name} #{tokenId}
        </span>
      </div>
      <div className="text-black font-bold px-2 py-0">
        <div className="my-2 flex flex-col">
          <span className="text-gray-700 text-xs">Price</span>
          <div className="flex items-center py-1">
            <img src={ethIcon} alt="Floor Price" />
            {utils.formatUnits(floor_price, 'gwei')}
          </div>
        </div>
      </div>
      <div className="bg-black text-white p-2 flex items-center text-sm">
        <MdTimer size={15} className="mr-2" />
        <span>3 days left</span>
      </div>
    </div>
  )
}

export default NFT
