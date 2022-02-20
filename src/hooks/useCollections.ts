import mockData from '../mockData.json'

const useCollections = () => {
  return mockData.collections.map(({ collection }) => collection)
}

export default useCollections
