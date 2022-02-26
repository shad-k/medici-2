import mockData from '../mockData.json'

const useAsset = (collectionSlug: string, tokenId: string) => {
  const collections = mockData.collections
  const collection = collections.find(
    ({ collection }) => collection.slug === collectionSlug
  )

  const nft = collection?.collection.owner_list.find(
    (nft) => nft.tokenId === parseInt(tokenId)
  )

  return nft
}

export default useAsset
