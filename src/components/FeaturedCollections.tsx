import React from 'react'
import { Link } from 'react-router-dom'
import { MdArrowForward } from 'react-icons/md'

import { Collection } from '../model/types'
import useCollections from '../hooks/useCollections'
import FeaturedCollectionCard from './FeaturedCollectionCard'

const FeaturedCollections = () => {
  const { data, error } = useCollections()
  if ((!data && !error) || data.length === 0) {
    return null
  }

  const featuredCollections = data.slice(1, 4)

  return (
    <div className="lg:w-4/5 m-auto flex justify-between items-center flex-wrap">
      <Link to="/collections" className="flex items-center text-xl">
        View All <MdArrowForward className="ml-1" />
      </Link>
      <div className="mt-4 w-full grid md:grid-cols-3 px-2 md:px-0">
        {featuredCollections.map((collection: Collection) => (
          <FeaturedCollectionCard collection={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedCollections
