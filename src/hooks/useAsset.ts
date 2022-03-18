import mockData from '../mockData.json'
import { Token } from '../types'

const useAsset = (collectionId: string, tokenId: string): Token => {
  const collections = (mockData as any).tokenContracts
  const collection = collections.find(({ id }: any) => id === collectionId)

  const nft = collection?.tokens.find((nft: Token) => nft.tokenID === tokenId)

  return nft
}

export default useAsset
