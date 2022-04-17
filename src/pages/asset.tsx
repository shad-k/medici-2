import React from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MdOutlineDescription,
  // MdVerified,
  // MdTimer,
  // MdLocalOffer,
} from 'react-icons/md'
import { BiChevronRight, BiChevronDown } from 'react-icons/bi'
// import { utils } from 'ethers'

import useAsset from '../hooks/useAsset'
import useCollection from '../hooks/useCollection'
// import { FaWallet } from 'react-icons/fa'
// import ImageFromIPFSMetadata from '../components/ImageFromIPFSMetadata'
// import ImageFromBase64 from '../components/ImageFromBase64'
import BuyConfirmationModal from '../components/BuyConfirmationModal'
import NFTImage from '../components/NFTImage'
// import EthIcon from '../components/svgComponents/EthIcon'

const Asset: React.FC<{}> = () => {
  const { collectionId, tokenId } = useParams()
  const { data: collection, error } = useCollection(collectionId as string)
  const { data: nft } = useAsset(tokenId as string, collection)
  const [openDescription, setOpenDescription] = React.useState(true)
  const [openOffers, setOpenOffers] = React.useState(true)
  const [showBuyConfirmationModal, setShowBuyConfirmationModal] =
    React.useState(false)

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
  // const description =
  //   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem qui sed quae repellat dolor minima dolorum! Beatae necessitatibus distinctio itaque doloremque excepturi explicabo totam, asperiores ut reprehenderit, minus corrupti quibusdam.'
  const floor_price = 0

  const tokenURIJson = JSON.parse(
    collection.tokens[0].tokenURI.substring(
      0,
      collection.tokens[0].tokenURI.length - 1
    )
  )
  const { description, image } = tokenURIJson

  const openBuyConfirmationModal = () => {
    setShowBuyConfirmationModal(true)
  }

  const closeBuyConfirmationModal = () => {
    setShowBuyConfirmationModal(false)
  }

  return (
    <div className="lg:w-4/5 m-auto flex flex-wrap justify-between items-center pb-4 w-full h-full">
      <div className="w-full lg:w-2/5 h-full relative pt-4 lg:pt-0">
        <NFTImage nft={nft} collection={collection} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-start p-8 pt-4 lg:pt-20">
        {/* <Link to={`/collection/${collection?.id}`}>
          <div className="rounded-md shadow-md flex items-center justify-between p-2 bg-white text-black">
            {image ? (
              image.startsWith('ipfs://') ? (
                <ImageFromIPFSMetadata
                  src={image}
                  height={50}
                  width={50}
                  alt={collection.name}
                  className="rounded-md"
                />
              ) : image.startsWith('data:application/json;base64') ? (
                <ImageFromBase64
                  src={image}
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
              )
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
        </Link> */}

        <h2 className="mt-10 text-2xl font-bold">
          {collection.name} #{nft.tokenID}
        </h2>
        <p className="mt-2 text-sm">
          Owned by <span className="text-red-500">{nft.owner.id}</span>
        </p>

        {/* <div className="text-white font-bold mt-8 mb-1 py-0">
          <div className="flex flex-col">
            <span className="text-xs">Price</span>
            <div className="flex items-center py-1 text-white">
              <EthIcon />
              {utils.formatUnits(floor_price, 'gwei')}
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-300 text-sm">
          <MdTimer className="mr-2" /> Sale ends May 22, 2022, 12:00 PM
        </div>

        <div className="mt-8 flex items-center">
          <button
            className="bg-white px-6 py-2 text-black text-lg rounded-md flex items-center mr-4"
            onClick={openBuyConfirmationModal}
          >
            <FaWallet className="mr-2" /> Buy Now
          </button>
          <button className="bg-black border border-white px-6 py-2 text-white text-lg rounded-md flex items-center">
            <MdLocalOffer className="mr-2 text-white" /> Make Offer
          </button>
        </div> */}

        {/* <div className="w-full rounded-md border border-gray-300 mt-10">
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
        </div> */}
        <div className="w-full rounded-md mt-10">
          <div
            className="flex items-center p-4 cursor-pointer"
            onClick={toggleDescription}
          >
            <MdOutlineDescription className="mr-2" />
            <span className="flex-1">Description</span>
            {openDescription ? <BiChevronDown /> : <BiChevronRight />}
          </div>
          {openDescription && (
            <div className="p-4 border-t border-gray-700">{description}</div>
          )}
        </div>
      </div>
      {showBuyConfirmationModal && (
        <BuyConfirmationModal
          closeModal={closeBuyConfirmationModal}
          nft={nft}
          collection={collection}
        />
      )}
    </div>
  )
}

export default Asset
