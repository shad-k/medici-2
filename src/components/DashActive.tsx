import React, { useEffect, useState } from 'react'
import HeroCollectionCard from './HeroCollectionCard'
import { utils } from 'ethers'
import EthIcon from './svgComponents/EthIcon'
import useTestActiveProject from '../hooks/useTestActiveProject'
import { createPopper } from '@popperjs/core';


const DashActive: React.FC<{}> = () => {
    const [showFullAddress, setShowFullAddress] = useState<boolean>(false)
    const project = useTestActiveProject()
    const collection = project?.project;

    return (
        <section id="DashActiveBox" className="w-4/5 lg:w-3/5 m-auto flex flex-col md:flex-row items justify-between flex-1 items-center">
            {collection && <HeroCollectionCard collection={collection}/>}
            {collection && (
            <div className="w-4/5 lg:w-3/5 lg:ml-20 order-2 flex flex-col">
                <span className="md:ml-5 text-center md:text-left text-2xl md:text-4xl px-2 py-2 md:py-0">{collection.numMinted}/{collection.numTokens} Mints</span>
                <div className="md:ml-5 p-2 border-b border-gray-300 w-full lg:w-4/5">
                    <div className="flex items-center text-2xl my-2 pt-4">Details</div>
                </div>
                <div className="md:ml-5 text-gray-500 w-full lg:w-4/5 p-2">
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic">Contract Address</span>
                        <span className="ml-6 font-monospace text-white text-xxs" onMouseOver={() => setShowFullAddress(true)} onMouseLeave={() => setShowFullAddress(false)} onClick={() => {navigator.clipboard.writeText(collection.id)}}>
                            {
                            `${collection.id.slice(
                            0,6
                            )}...${collection.id.slice(-6)}`
                            }
                        </span>
                    </div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Contract Type </span><div id="contractAddress" className="ml-6 font-monospace text-white">{collection.tokenType}</div></div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Floor Price </span><span className="ml-6 font-monospace inline-flex text-white "><EthIcon/>{parseFloat(utils.formatUnits(collection.floor_price, 'gwei')).toFixed(2)}</span></div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Blockchain </span><span className="ml-6 font-monospace text-white">{collection.chain}</span></div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Created On </span><span className="ml-6 font-monospace text-white">{collection.creationTime}</span></div>
                </div>
            </div>)
            }
        </section>
    );
}

export default DashActive