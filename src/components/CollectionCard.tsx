import React from 'react'
import { MdVerified } from 'react-icons/md'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import { utils } from 'ethers'

import type { Collection } from '../types'
import ethIcon from './eth-icon.svg'

const CollectionCard: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  const {
    slug,
    profile_image,
    name,
    verified,
    description,
    total_supply,
    unique_owners,
    floor_price,
    volume_traded,
  } = collection
  return (
    <Link
      to={`/collection/${slug}`}
      className="rounded-md shadow-lg p-2 bg-white flex items-center justify-between w-full md:w-1/3 my-4 text-black"
    >
      <img
        src={profile_image}
        alt={name}
        className="rounded-md overflow-hidden object-cover object-center"
        style={{
          height: '150px',
          width: '120px',
        }}
      />
      <div className="flex-1 flex flex-col justify-between items-start pl-2">
        <span className="flex items-center font-bold">
          {name} {verified && <MdVerified className="ml-2" />}
        </span>
        <span className="text-gray-700 text-sm">
          {description.substring(0, 50)}...
        </span>
        <div className="flex items-center justify-between flex-1 w-full py-5">
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold">
              {numeral(total_supply).format('0.0a')}
            </span>
            <span className="text-gray-700 text-sm">items</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold">
              {numeral(unique_owners).format('0a')}
            </span>
            <span className="text-gray-700 text-sm">owners</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold flex items-center">
              <img src={ethIcon} alt="Floor Price" />
              {utils.formatUnits(floor_price, 'gwei')}
            </span>
            <span className="text-gray-700 text-sm">floor</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-black font-bold flex items-center">
              <img src={ethIcon} alt="Volume Traded" />
              {parseFloat(utils.formatUnits(volume_traded, 'gwei')).toFixed(2)}
            </span>
            <span className="text-gray-700 text-sm">volume</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
