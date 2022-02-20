import React from 'react'
import { utils } from 'ethers'
import numeral from 'numeral'

import ethIcon from './eth-icon.svg'
import { Collection } from '../types'

const Stats: React.FC<{ collection: Collection }> = ({ collection }) => {
  const {
    total_supply,
    unique_owners,
    floor_price,
    volume_traded,
    owner_list,
  } = collection
  return (
    <div className="flex items-start md:items-end justify-between w-full space-x-4 overflow-auto md:overflow-hidden">
      <div className="flex flex-col items-center justify-between bg-white rounded-md shadow-md flex-1 py-2 min-w-[100px] my-2 md:my-0">
        <span className="text-black font-bold">
          {numeral(total_supply).format('0.0a')}
        </span>
        <span className="text-gray-700 text-sm">items</span>
      </div>
      <div className="flex flex-col items-center justify-between bg-white rounded-md shadow-md flex-1 py-2 min-w-[100px] my-2 md:my-0">
        <span className="text-black font-bold">
          {numeral(unique_owners).format('0a')}
        </span>
        <span className="text-gray-700 text-sm">owners</span>
      </div>
      <div className="flex flex-col items-center justify-between bg-white rounded-md shadow-md flex-1 py-2 min-w-[100px] my-2 md:my-0">
        <span className="text-black font-bold">
          {numeral(owner_list.length).format('0a')}
        </span>
        <span className="text-gray-700 text-sm">listed</span>
      </div>
      <div className="flex flex-col items-center justify-between bg-white rounded-md shadow-md flex-1 py-2 min-w-[100px] my-2 md:my-0">
        <span className="text-black font-bold flex items-center">
          <img src={ethIcon} alt="Floor Price" />
          {utils.formatUnits(floor_price, 'gwei')}
        </span>
        <span className="text-gray-700 text-sm">floor</span>
      </div>
      <div className="flex flex-col items-center justify-between bg-white rounded-md shadow-md flex-1 py-2 min-w-[100px] my-2 md:my-0">
        <span className="text-black font-bold flex items-center">
          <img src={ethIcon} alt="Volume Traded" />
          {parseFloat(utils.formatUnits(volume_traded, 'gwei')).toFixed(2)}
        </span>
        <span className="text-gray-700 text-sm">volume</span>
      </div>
    </div>
  )
}

export default Stats
