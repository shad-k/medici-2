import React from 'react'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import { utils } from 'ethers'

import type { Collection } from '../model/types'
import ImageFromIPFSMetadata from './ImageFromIPFSMetadata'
import ImageFromBase64 from './ImageFromBase64'
import EthIcon from './svgComponents/EthIcon'

const CollectionCard: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  const { id, name, numTokens, numOwners, tokens } = collection
  const collectionImage = tokens?.length > 0 ? tokens[0].tokenURI : null

  return (
    <Link
      to={`/asset/${id}/${tokens[0].tokenID}`}
      className="rounded-md shadow-lg p-2 bg-white flex items-center justify-between mx-2 my-4 text-black"
    >
      {collectionImage ? (
        collectionImage.startsWith('ipfs://') ? (
          <ImageFromIPFSMetadata
            src={collectionImage}
            alt={name}
            className="rounded-md overflow-hidden object-cover object-center"
            style={{
              height: '150px',
              width: '120px',
            }}
          />
        ) : collectionImage.startsWith('data:application/json;base64') ? (
          <ImageFromBase64
            src={collectionImage}
            alt={name}
            className="rounded-md overflow-hidden object-cover object-center"
            style={{
              height: '150px',
              width: '120px',
            }}
          />
        ) : (
          <img
            src={'https://placeholder.pics/svg/120x150'}
            alt={name}
            className="rounded-md overflow-hidden object-cover object-center"
            style={{
              height: '150px',
              width: '120px',
            }}
          />
        )
      ) : (
        <img
          src={'https://placeholder.pics/svg/120x150'}
          alt={name}
          className="rounded-md overflow-hidden object-cover object-center"
          style={{
            height: '150px',
            width: '120px',
          }}
        />
      )}

      <div className="flex-1 flex flex-col justify-between items-start pl-2">
        <span className="flex items-center font-bold">
          {/* {name} {verified && <MdVerified className="ml-2" />} */}
          {name}
        </span>
        <span className="text-gray-700 text-sm">
          {/* {description.substring(0, 50)}... */}
          {'Lorem ipsum'.substring(0, 50)}...
        </span>
        <div className="flex items-center justify-between flex-1 w-full py-5">
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold">
              {numeral(numTokens).format('0.0a')}
            </span>
            <span className="text-gray-700 text-sm">items</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold">
              {numeral(numOwners).format('0a')}
            </span>
            <span className="text-gray-700 text-sm">owners</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold flex items-center">
              <EthIcon />
              {/* {utils.formatUnits(floor_price, 'gwei')} */}
              {utils.formatUnits(0, 'gwei')}
            </span>
            <span className="text-gray-700 text-sm">floor</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold flex items-center">
              <EthIcon />
              {/* {parseFloat(utils.formatUnits(volume_traded, 'gwei')).toFixed(2)} */}
              {parseFloat(utils.formatUnits(0, 'gwei')).toFixed(2)}
            </span>
            <span className="text-gray-700 text-sm">volume</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
