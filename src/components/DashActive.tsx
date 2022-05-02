import React from 'react'
import HeroCollectionCard from './HeroCollectionCard';
import useCollection from '../hooks/useCollection';


import type { Collection } from '../types'

const DashActive: React.FC<{ collection: Collection }> = ( { collection } ) => {
    const { data, error } = useCollection(collection.id as string)
    if (!data && !error) {
        return null
    }

    if (!data) {
        return null
    }

    return (
        <section className="w-4/5 lg:w-3/5 m-auto flex flex-col md:flex-row items justify-between flex-1 items-center">
            <HeroCollectionCard collection={data}/>
            <div className="w-4/5 lg:w-2/5 order-2 flex flex-col">
                <span className="text-center md:text-left text-2xl md:text-4xl px-2 py-4 md:py-0">5000/100,000<br></br>Mints</span>
                <div className="p-2 border-b border-gray-300 w-full lg:w-4/5">
                    <div className="flex items-center text-2xl my-2">Details</div>
                </div>
                <div className="text-gray-500 w-full lg:w-4/5 p-2">
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Contract address </span><span className="ml-6 font-monospace text-right text-white">{data.name}</span></div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Contract Type </span><span className="ml-6 font-monospace text-white">ERC-721</span></div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Number of tokens in circulation </span><span className="ml-6 font-monospace text-white">{data.numTokens}</span></div>
                    <div className="flex flex-row justify-between text-xs lg:text-sm mb-1 mt-4"><span className="font-italic"> Blockchain </span><span className="ml-6 font-monospace text-white">Optimism</span></div>
                </div>
            </div>
        </section>
    );
}

export default DashActive