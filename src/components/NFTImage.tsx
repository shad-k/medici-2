import React from 'react'
import { Collection, Token } from '../types'
import ImageFromBase64 from './ImageFromBase64'
import ImageFromIPFSMetadata from './ImageFromIPFSMetadata'

interface INFTImageProps {
  nft: Token
  collection?: Collection
}

const NFTImage: React.FC<INFTImageProps> = ({ nft, collection }) => {
  if (nft?.tokenURI.startsWith('ipfs://')) {
    return (
      <ImageFromIPFSMetadata
        src={nft.tokenURI}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  } else if (nft?.tokenURI.startsWith('data:application/json;base64')) {
    return (
      <ImageFromBase64
        src={nft.tokenURI}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  } else {
    return (
      <img
        src={'https://placeholder.pics/svg/300x300'}
        alt={`${nft?.tokenID}` || collection?.name || ''}
        className="rounded-md"
      />
    )
  }
}

export default NFTImage
