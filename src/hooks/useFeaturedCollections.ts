import React from 'react'
import mockData from '../featured_mockdata.json'

const useFeaturedCollections = () => {
  const [collections, setCollections] = React.useState([])

  React.useEffect(() => {
    setCollections((mockData as any).tokenContracts)
  }, [])
  return collections
}

export default useFeaturedCollections
