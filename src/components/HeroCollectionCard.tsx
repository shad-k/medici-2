import React from 'react'
import { MdVerified } from 'react-icons/md'
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
      ? JSON.parse(
          tokens[0].tokenURI.substring(0, tokens[0].tokenURI.length - 1)
        )
      : null

  const { image: collectionImage, name } = tokenURIJson
  console.log(collectionImage)

  return (
    <Link
      to={`/collection/${id}`}
      className="rounded-2xl shadow-xl shadow-white bg-white mx-2 my-4 text-black order-1 md:order-2 hero-collection w-1/2"
    >
      {collectionImage ? (
        collectionImage.startsWith('ipfs://') ? (
          <ImageFromIPFSMetadata
            src={collectionImage}
            alt={name}
            className="rounded-2xl overflow-hidden object-cover object-center w-full"
          />
        ) : collectionImage.startsWith('data:application/json;base64') ? (
          <ImageFromBase64
            src={collectionImage}
            alt={name}
            className="rounded-2xl overflow-hidden object-cover object-center w-full"
          />
        ) : collectionImage.startsWith('https://') ? (
          <img
            src={collectionImage}
            alt={name}
            className="rounded-2xl overflow-hidden object-cover object-center w-full"
          />
        ) : (
          <img
            src={'https://placeholder.pics/svg/120x150'}
            alt={name}
            className="rounded-2xl overflow-hidden object-cover object-center w-full"
          />
        )
      ) : (
        <img
          src={'https://placeholder.pics/svg/120x150'}
          alt={name}
          className="rounded-2xl overflow-hidden object-cover object-center w-full"
        />
      )}

      <div className="flex flex-col justify-between items-start px-4 py-6">
        <span className="flex items-center font-bold">
          {/* {name} {verified && <MdVerified className="ml-2" />} */}
          {name} <MdVerified className="ml-2" color="#1AC689" />
        </span>{' '}
      </div>
    </Link>
  )
}

export default HeroCollectionCard
