import React from 'react'
import { MdVerified, MdWeb } from 'react-icons/md'
import { BsTwitter } from 'react-icons/bs'
import { FaDiscord, FaImages } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import Stats from '../components/Stats'
import ListedNFTs from '../components/ListedNFTs'
import useCollection from '../hooks/useCollection'
import ImageFromIPFSMetadata from '../components/ImageFromIPFSMetadata'
import ImageFromBase64 from '../components/ImageFromBase64'

const Collection: React.FC<{}> = () => {
  const { id } = useParams()
  const collection = useCollection(id as string)
  if (!collection) {
    return null
  }
  const {
    id: collectionId,
    name,
    tokens,
    // verified,
    // description,
    // owner_list,
    // twitter_link,
    // discord_link,
    // site_link,
  } = collection

  /**
   * Remove these once we have data
   */
  const twitter_link = 'null'
  const discord_link = 'null'
  const site_link = 'null'
  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sunt unde explicabo odit voluptatibus iusto, nesciunt maiores possimus suscipit natus quisquam inventore dignissimos et, ab temporibus quo? Perferendis, minima ab?'
  /** */

  const coverImage = tokens?.length > 0 ? tokens[1].tokenURI : null
  const profileImage = tokens?.length > 0 ? tokens[0].tokenURI : null

  return (
    <div className="w-full min-h-[calc(100vh-65px)]">
      <div className="relative w-full">
        <div className="absolute w-full h-80 top-0">
          {coverImage ? (
            coverImage.startsWith('ipfs://') ? (
              <ImageFromIPFSMetadata
                src={coverImage}
                alt={name}
                className="w-full object-cover"
                style={{
                  width: '100%',
                  height: '300px',
                }}
              />
            ) : coverImage.startsWith('data:application/json;base64') ? (
              <ImageFromBase64
                src={coverImage}
                alt={name}
                className="w-full object-cover"
                style={{
                  width: '100%',
                  height: '300px',
                }}
              />
            ) : (
              <img
                src={'https://placeholder.pics/svg/600x300'}
                alt={name}
                className="w-full object-cover"
                style={{
                  width: '100%',
                  height: '300px',
                }}
              />
            )
          ) : (
            <img
              src={'https://placeholder.pics/svg/600x300'}
              alt={name}
              className="w-full object-cover"
              style={{
                width: '100%',
                height: '300px',
              }}
            />
          )}
        </div>
        <div className="relative px-2 md:px-8 w-full pt-[180px] flex flex-col md:flex-row justify-between z-10">
          {profileImage ? (
            profileImage.startsWith('ipfs://') ? (
              <ImageFromIPFSMetadata
                src={profileImage}
                alt={name}
                className="h-64 w-64 rounded-md mr-8"
              />
            ) : profileImage.startsWith('data:application/json;base64') ? (
              <ImageFromBase64
                src={profileImage}
                alt={name}
                className="h-64 w-64 rounded-md mr-8"
              />
            ) : (
              <img
                src={profileImage as string}
                alt={name}
                className="h-64 w-64 rounded-md mr-8"
              />
            )
          ) : (
            <img
              src={profileImage as string}
              alt={name}
              className="h-64 w-64 rounded-md mr-8"
            />
          )}
          <Stats collection={collection} />
        </div>
      </div>
      <div className="rounded-md bg-white mt-8 m-2 md:m-8 p-2 flex flex-col md:flex-row items-start justify-between text-black">
        <div className="w-full md:w-2/12">
          <h1 className="text-2xl font-bold flex items-start">
            {/* {name} {verified && <MdVerified className="ml-1" />} */}
            {name} <MdVerified className="ml-1" />
          </h1>
          <div className="text-sm text-gray-700 mt-2">{description}</div>
          <div className="text-sm text-gray-700 mt-2 flex items-center">
            {site_link && (
              <a
                href={site_link}
                target="_blank"
                rel="noopener, nofollow, noreferrer"
              >
                <MdWeb size={25} />
              </a>
            )}
            {twitter_link && (
              <a
                href={twitter_link}
                target="_blank"
                rel="noopener, nofollow, noreferrer"
              >
                <BsTwitter size={25} className="mx-8" />
              </a>
            )}
            {discord_link && (
              <a
                href={discord_link}
                target="_blank"
                rel="noopener, nofollow, noreferrer"
              >
                <FaDiscord size={25} />
              </a>
            )}
          </div>
        </div>
        <div className="w-full md:w-10/12 mt-6 md:mt-0 md:px-6">
          <button className="bg-black px-6 py-2 text-white text-lg rounded-md flex items-center mb-8">
            <FaImages className="mr-2 text-white" /> Items
          </button>
          {tokens.length > 0 ? (
            <ListedNFTs collection={collection} />
          ) : (
            <div className="h-40 w-full flex items-center justify-center text-gray-500 text-lg font-bold">
              No NFTs listed for this collection
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
