import React from 'react'
import { Link } from 'react-router-dom'
import { MdArrowForward } from 'react-icons/md'

import useFeaturedCollections from '../hooks/useFeaturedCollections'
import { Collection } from '../types'
import CollectionCard from './CollectionCard'

const FeaturedCollections = () => {
  const collections = useFeaturedCollections()
  if (collections.length === 0) {
    return null
  }

  return (
    <div className="lg:w-4/5 m-auto flex justify-between items-center flex-wrap">
      <h3 className="text-xl text-white border border-white rounded-md px-4 py-2">
        Collections
      </h3>
      <Link to="/collections" className="flex items-center text-xl">
        View All <MdArrowForward className="ml-1" />
      </Link>
      <div className="mt-4 w-full grid md:grid-cols-3 px-2 md:px-0">
        {collections.map((collection: Collection) => (
          <CollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedCollections
