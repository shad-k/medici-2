import React from 'react'
import AllCollections from './AllCollections'

import FeaturedCollections from './FeaturedCollections'

const Collections: React.FC<{ viewAll?: boolean }> = ({ viewAll = false }) => {
  if (viewAll) {
    return <AllCollections />
  }
  return <FeaturedCollections />
}

export default Collections
