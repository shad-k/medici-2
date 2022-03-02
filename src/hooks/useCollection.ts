import mockData from '../mockData.json'
import { Collection } from '../types'

const useCollection = (slug: string): Collection => {
  const collection = (mockData as any).tokenContracts.find(
    ({ id }: any) => id === slug
  )
  return collection
}

export default useCollection
