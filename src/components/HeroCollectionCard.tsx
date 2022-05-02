import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import type { Collection } from '../types'
import ImageFromIPFSMetadata from './ImageFromIPFSMetadata'
import ImageFromBase64 from './ImageFromBase64'

const HeroCollectionCard: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  const { id, tokens } = collection
  const tokenURIJson = 
    tokens?.length > 0
    ? tokens[0].tokenURI.substring(0, tokens[0].tokenURI.length) : null

  const name = collection.name
  const collectionImage  = tokenURIJson

  return (
    <Link
      to={`/asset/${id}/${tokens[0].tokenID}`}
      className="rounded-2xl shadow-xl shadow-white bg-white mx-2 my-4 text-black order-1 md:order-2 hero-collection w-11/12 lg:w-6/12 lg:min-w-[320px]"
    >
      {collectionImage ? (
        collectionImage.startsWith('ipfs://') ? (
          <ImageFromIPFSMetadata
            src={collectionImage}
            alt={name}
            className="rounded-t-2xl overflow-hidden object-cover object-center w-full lg:min-w-[320px] lg:min-h-[320px] lg:min-w-[320px] lg:min-h-[480px] lg:max-h-[480px]"
          />
        ) : collectionImage.startsWith('data:application/json;base64') ? (
          <ImageFromBase64
            src={collectionImage}
            alt={name}
            className="rounded-t-2xl overflow-hidden object-cover object-center w-full min-w-[320px] min-h-[480px] max-h-[480px]"
          />
        ) : collectionImage.startsWith('https://') ? (
          <img
            src={collectionImage}
            alt={name}
            className="rounded-t-2xl overflow-hidden object-cover object-center w-full lg:min-w-[320px] lg:min-h-[320px] lg:min-w-[320px] lg:min-h-[480px] lg:max-h-[480px]"
          />
        ) : (
          <img
            src={'https://placeholder.pics/svg/120x150'}
            alt={name}
            className="rounded-t-2xl overflow-hidden object-cover object-center w-full lg:min-w-[320px] lg:min-h-[320px] lg:min-w-[320px] lg:min-h-[480px] lg:max-h-[480px]"
          />
        )
      ) : (
        <img
          src={'https://placeholder.pics/svg/120x150'}
          alt={name}
          className="rounded-t-2xl overflow-hidden object-cover object-center w-full lg:min-w-[320px] lg:min-h-[320px] lg:min-w-[320px] lg:min-h-[480px] lg:max-h-[480px]"
        />
      )}

      <div className="flex flex-col justify-between items-start px-2 py-2 md:px-4 md:py-6">
        <span className="flex items-center font-bold text-sm text-xl">
          {/* {name} {verified && <MdVerified className="ml-2" />} */}
          {name}
        </span>{' '}
      </div>
    </Link>
  )
}

export default HeroCollectionCard
