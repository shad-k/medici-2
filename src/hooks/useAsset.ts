import { Collection, Token } from '../model/types'

type UseAssetReturn = {
  data?: Token
  error?: unknown
}
const useAsset = (tokenId: string, collection?: Collection): UseAssetReturn => {
  if (!collection) {
    return { data: undefined, error: undefined }
  }
  const nft = collection?.tokens.find((nft: Token) => nft.tokenID === tokenId)

  return { data: nft }
}

export default useAsset
