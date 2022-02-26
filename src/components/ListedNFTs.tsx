import React from 'react'
import { Link } from 'react-router-dom'

import NFT from './NFT'
import { Collection } from '../types'

const ListedNFTs: React.FC<{ collection: Collection }> = ({ collection }) => {
  const { owner_list: nfts } = collection
  return (
    <div className="w-full space-y-3 md:space-y-0 md:space-x-3 grid grid-cols-1 md:grid-cols-4">
      {nfts.map((nft) => (
        <Link to={`/asset/${collection.slug}/${nft.tokenId}`}>
          <NFT collection={collection} nft={nft} />
        </Link>
      ))}
    </div>
  )
}

export default ListedNFTs
