import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MdOutlineDescription,
  MdVerified,
  MdTimer,
  MdLocalOffer,
} from 'react-icons/md'
import { BiChevronRight, BiChevronDown } from 'react-icons/bi'
import { utils } from 'ethers'

import useAsset from '../hooks/useAsset'
import useCollection from '../hooks/useCollection'
import { FaWallet } from 'react-icons/fa'
import ImageFromIPFSMetadata from '../components/ImageFromIPFSMetadata'

const Asset: React.FC<{}> = () => {
  const { collectionId, tokenId } = useParams()
  const collection = useCollection(collectionId as string)
  const nft = useAsset(collectionId as string, tokenId as string)
  const [openDescription, setOpenDescription] = React.useState(true)
  const [openOffers, setOpenOffers] = React.useState(true)

  const toggleDescription = () => {
    setOpenDescription((val) => !val)
  }

  const toggleOffers = () => {
    setOpenOffers((val) => !val)
  }

  if (!nft || !collection) {
    return null
  }

  // TODO: assign offers below
  const offers = null

  // TODO: remove
  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem qui sed quae repellat dolor minima dolorum! Beatae necessitatibus distinctio itaque doloremque excepturi explicabo totam, asperiores ut reprehenderit, minus corrupti quibusdam.'
  const floor_price = 0

  const collectionImage =
    collection.tokens.length > 0 ? collection.tokens[0].tokenURI : null

  return (
    <div className="lg:w-4/5 m-auto flex justify-between items-center flex-wrap pb-4 h-full">
      <div className="w-2/5 h-full">
        {nft.tokenURI && nft.tokenURI.startsWith('ipfs://') ? (
          <ImageFromIPFSMetadata
            src={nft.tokenURI}
            alt={`${nft?.tokenId}` || collection?.name || ''}
            className="rounded-md"
          />
        ) : (
          <img
            src={'https://placeholder.pics/svg/300x300'}
            alt={`${nft?.tokenId}` || collection?.name || ''}
            className="rounded-md"
          />
        )}
        <div className="w-full rounded-md border border-gray-300 mt-10">
          <div
            className="flex items-center p-4 cursor-pointer"
            onClick={toggleDescription}
          >
            <MdOutlineDescription className="mr-2" />
            <span className="flex-1">Description</span>
            {openDescription ? <BiChevronDown /> : <BiChevronRight />}
          </div>
          {openDescription && (
            <div className="p-4 border-t border-gray-300">{description}</div>
          )}
        </div>
      </div>
      <div className="w-3/5 flex flex-col items-start p-8 pt-20 h-full">
        <Link to={`/collection/${collection?.id}`}>
          <div className="rounded-md shadow-md flex items-center justify-between p-2 bg-white text-black">
            {collectionImage && collectionImage.startsWith('ipfs://') ? (
              <ImageFromIPFSMetadata
                src={collectionImage}
                height={50}
                width={50}
                alt={collection.name}
                className="rounded-md"
              />
            ) : (
              <img
                src={'https://placeholder.pics/svg/50x50'}
                height={50}
                width={50}
                alt={collection.name}
                className="rounded-md"
              />
            )}

            <div className="flex-1 flex flex-col ml-4">
              <span className="text-sm">Collection</span>
              <span className="text-lg font-bold flex items-center">
                {collection?.name}
                <MdVerified className="ml-2" />
              </span>
            </div>
          </div>
        </Link>

        <h2 className="mt-10 text-2xl font-bold">
          {collection.name} #{nft.tokenId}
        </h2>
        <p className="mt-2 text-sm">
          Owned by <span className="text-red-500">{nft.owner.id}</span>
        </p>

        <div className="text-white font-bold mt-8 mb-1 py-0">
          <div className="flex flex-col">
            <span className="text-xs">Price</span>
            <div className="flex items-center py-1 text-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
              </svg>
              {utils.formatUnits(floor_price, 'gwei')}
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-300 text-sm">
          <MdTimer className="mr-2" /> Sale ends May 22, 2022, 12:00 PM
        </div>

        <div className="mt-8 flex items-center">
          <button className="bg-white px-6 py-2 text-black text-lg rounded-md flex items-center mr-4">
            <FaWallet className="mr-2" /> Buy Now
          </button>
          <button className="bg-black border border-white px-6 py-2 text-white text-lg rounded-md flex items-center">
            <MdLocalOffer className="mr-2 text-white" /> Make Offer
          </button>
        </div>

        <div className="w-full rounded-md border border-gray-300 mt-10">
          <div
            className="flex items-center p-4 cursor-pointer"
            onClick={toggleOffers}
          >
            <MdLocalOffer className="mr-2" />
            <span className="flex-1">Offers</span>
            {openOffers ? <BiChevronDown /> : <BiChevronRight />}
          </div>
          {openOffers && (
            <div className="p-4 border-t border-gray-300 min-h-[100px]">
              {offers ? null : (
                <div className="flex items-center justify-center h-full w-full">
                  No offers yet
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Asset
