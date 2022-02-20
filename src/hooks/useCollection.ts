import mockData from '../mockData.json'

const useCollection = (slug: string) => {
  const collection = mockData.collections.find(
    ({ collection }) => collection.slug === slug
  )
  return collection ? collection.collection : undefined
}

export default useCollection
