import React from 'react'

import { Collection } from '../types'
import CollectionCard from './CollectionCard'
import useCollections from '../hooks/useCollections'

const AllCollections = () => {
  const { data, error } = useCollections()
  if (!data && !error) {
    return null
  }
  console.log(data)
  if (!data) {
    return null
  }
  const {
    data: { tokenContracts },
  } = data
  return (
    <div className="lg:w-4/5 m-auto pt-12 flex justify-between items-center flex-wrap">
      <h3 className="text-xl text-white border border-white rounded-md px-4 py-2">
        All Collections
      </h3>
      <div className="mt-4 w-full grid md:grid-cols-3 px-2 md:px-0">
        {tokenContracts.map((collection: Collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}

export default AllCollections
