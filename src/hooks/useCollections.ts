import React from 'react'
import mockData from '../mockData.json'

const useCollections = () => {
  const [collections, setCollections] = React.useState([])

  React.useEffect(() => {
    setCollections((mockData as any).tokenContracts)
  }, [])
  return collections
}

export default useCollections
