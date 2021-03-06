import { utils } from 'ethers'
import React from 'react'
import { MdTimer } from 'react-icons/md'

import { Collection, Token } from '../types'
import ImageFromBase64 from './ImageFromBase64'
import ImageFromIPFSMetadata from './ImageFromIPFSMetadata'
import EthIcon from './svgComponents/EthIcon'

const NFT: React.FC<{
  collection: Collection
  nft: Token
}> = ({ collection, nft }) => {
  const { tokenURI, tokenID } = nft
  console.log(tokenURI)
  const tokenURIJson = JSON.parse(tokenURI.substring(0, tokenURI.length - 1))
  const { name, image } = tokenURIJson

  // TODO: remove
  const verified = true
  const floor_price = 0
  //

  return (
    <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-lg">
      {image ? (
        image.startsWith('ipfs://') ? (
          <ImageFromIPFSMetadata
            src={image}
            alt={`NFT ${tokenID}`}
            className="w-full h-64 object-contain"
          />
        ) : image.startsWith('data:application/json;base64') ? (
          <ImageFromBase64
            src={image}
            alt={`NFT ${tokenID}`}
            className="w-full h-64 object-contain"
          />
        ) : image.startsWith('https://') ? (
          <img
            src={image}
            alt={`NFT ${tokenID}`}
            className="w-full h-64 object-contain"
          />
        ) : (
          <img
            src={'https://placeholder.pics/svg/64x64'}
            alt={`NFT ${tokenID}`}
            className="w-full h-64 object-cover"
          />
        )
      ) : (
        <img
          src={'https://placeholder.pics/svg/64x64'}
          alt={`NFT ${tokenID}`}
          className="w-full h-64 object-cover"
        />
      )}
      <div className="text-black  font-bold p-2 border-b border-gray-300">
        <div className="flex items-center text-xs my-2">{name}</div>
        <div className="font-bold min-h-[44px]">
          {name} #{tokenID}
        </div>
      </div>
      <div className="text-black font-bold px-2 py-0">
        <div className="my-2 flex flex-col">
          <span className="text-gray-700 text-xs">Price</span>
          <div className="flex items-center py-1">
            <EthIcon />
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
