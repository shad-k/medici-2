import React from 'react'
import { Link } from 'react-router-dom'

import NFT from './NFT'
import { Collection } from '../types'

const ListedNFTs: React.FC<{ collection: Collection }> = ({ collection }) => {
  const { tokens: nfts } = collection
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4">
      {nfts.map((nft) => (
        <Link to={`/asset/${collection.id}/${nft.tokenID}`} className="m-2">
          <NFT collection={collection} nft={nft} />
        </Link>
      ))}
    </div>
  )
}

export default ListedNFTs
