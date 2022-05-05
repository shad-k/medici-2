import type { ConnectOptions, WalletState } from '@web3-onboard/core'

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
  whitelist: Array<Owner>
  owner: Owner
  claimed: boolean
}

export type Collection = {
  id: string
  name: string
  tokenType: string
  numTokens: number
  numMinted: number
  numOwners: number
  supportsEIP721Metadata: boolean
  tokens: Array<Token>
  floor_price: number,
  balance: number
  chain: string
  creationTime: string

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

export type WalletContextReturn = {
  connect: (options: ConnectOptions) => Promise<void>
  wallet: WalletState | null
  connecting: boolean
}
