import React from 'react'
import { Collection, Token } from '../model/types'
import ImageFromBase64 from './ImageFromBase64'
import ImageFromIPFSMetadata from './ImageFromIPFSMetadata'

interface INFTImageProps {
  nft: Token
  collection?: Collection
}

const NFTImage: React.FC<INFTImageProps> = ({ nft, collection }) => {
  const tokenURIJson = JSON.parse(
    nft.tokenURI.substring(0, nft.tokenURI.length - 1)
  )
  const { image: tokenImage } = tokenURIJson
  let image
  if (tokenImage.startsWith('ipfs://')) {
    image = (
      <ImageFromIPFSMetadata
        src={tokenImage}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  } else if (tokenImage.startsWith('data:application/json;base64')) {
    image = (
      <ImageFromBase64
        src={tokenImage}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  } else if (tokenImage.startsWith('https://')) {
    image = (
      <img
        src={tokenImage}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  } else {
    image = (
      <img
        src={'https://placeholder.pics/svg/300x300'}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  }

  return (
    <div className="w-full h-full lg:fixed top-0 w-full lg:w-4/12 flex justify-between items-center">
      {image}
    </div>
  )
}

export default NFTImage
