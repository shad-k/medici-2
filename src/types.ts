export type ListedNFT = {
  owner: string
  tokenId: number
  image: string
}

export type Collection = {
  address: string
  name: string
  symbol: string
  total_supply: number
  unique_owners: number
  floor_price: number
  volume_traded: number
  royalty_per_mille: number
  payout_address: string
  verified: boolean
  profile_image: string
  cover_image: string | null
  slug: string
  description: string
  twitter_link: string
  discord_link: string
  site_link: string
  owner_list: Array<ListedNFT>
}
