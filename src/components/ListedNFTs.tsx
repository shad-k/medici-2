import React from 'react'

import NFT from './NFT'
import { Collection } from '../types'

const ListedNFTs: React.FC<{ collection: Collection }> = ({ collection }) => {
  const { owner_list: nfts } = collection
  return (
    <div className="w-full space-x-3 grid grid-cols-4">
      {nfts.map((nft) => (
        <NFT collection={collection} nft={nft} />
      ))}
    </div>
  )
}

export default ListedNFTs
