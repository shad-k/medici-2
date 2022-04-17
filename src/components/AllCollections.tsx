import React from 'react'

import { Collection } from '../types'
import useCollections from '../hooks/useCollections'
import FeaturedCollectionCard from './FeaturedCollectionCard'

const AllCollections = () => {
  const { data: collections, error } = useCollections()
  if (!collections && !error) {
    return null
  }

  if (!collections) {
    return null
  }

  return (
    <div className="lg:w-4/5 m-auto pt-12 flex justify-between items-center flex-wrap">
      <h3 className="text-xl text-white border border-white rounded-md px-4 py-2">
        All Collections
      </h3>
      <div className="mt-4 w-full grid md:grid-cols-3 px-2 md:px-0">
        {collections.map((collection: Collection) => (
          <FeaturedCollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}

export default AllCollections
