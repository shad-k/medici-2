export type ListedNFT = {
  owner: string
  tokenId: number
  image: string
}

export type Owner = {
  id: string
}

export type Token = {
  id: string
  tokenURI: string
  tokenID: string
  mintTime: number
  owner: Owner
}

export type Collection = {
  id: string
  name: string
  numTokens: number
  numOwners: number
  supportsEIP721Metadata: boolean
  tokens: Array<Token>

  // address: string
  // symbol: string
  // total_supply: number
  // unique_owners: number
  // floor_price: number
  // volume_traded: number
  // royalty_per_mille: number
  // payout_address: string
  // verified: boolean
  // profile_image: string
  // cover_image: string | null
  // slug: string
  // description: string
  // twitter_link: string
  // discord_link: string
  // site_link: string
  // owner_list: Array<ListedNFT>
}
