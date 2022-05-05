import React from 'react'
import useCollection from '../hooks/useCollection';


import type { Collection } from '../types'

const DashMintList: React.FC<{ collection: Collection }> = ( { collection } ) => {
    const { data, error } = useCollection(collection.id as string)
    if (!data && !error) {
        return null
    }

    if (!data) {
        return null
    }

    async function getOwnerStats() {
        console.log("hi")
    }

    return (
        <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4 rounded">
            <input type="search" id="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" onSubmit={() => getOwnerStats()}/>
            <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
            </span>
            </div>
            </div>
        </div>
    );
}

export default DashMintList