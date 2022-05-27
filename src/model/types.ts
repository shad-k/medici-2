import type {
  ConnectOptions,
  WalletState,
  ConnectedChain,
} from '@web3-onboard/core'
import type { BigNumber, Wallet } from 'ethers'

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
  symbol: string
  tokenType: string
  numTokens: number
  numMinted: number
  numOwners: number
  supportsEIP721Metadata: boolean
  tokens: Array<Token>
  floor_price: number
  balance: number
  chain: string
  creationTime: string
}

export type Contract = {
  name: string
  symbol: string
  masteraddress: string
  contractaddress: string
}

export type WalletContextReturn = {
  connect: (options: ConnectOptions) => Promise<void>
  wallet: WalletState | null
  connecting: boolean
  setChain: (options: {
    chainId: string
    chainNamespace?: string
    wallet?: WalletState['label']
  }) => Promise<boolean>
  connectedChain: ConnectedChain | null
  settingChain: boolean
}

export type ProjectContextReturn = {
  project: Collection | null
}

export type ContractCreationProps = {
  // callerWallet: WalletState,
  // merkleRoot: string,
  name: string
  symbol: string
  baseuri: string
  maxSupply: number
  price: BigNumber
  maxMintsPerPerson: number
  masterAddress: string
}

export type ContractCreationReturn = {
  name: string
  symbol: string
  instance: string
  masterAddress: string
}

export type WhitelistProps = {
  project: String
  symbol: String
  ERC721Contract: String
  ownerAddress: String // FIXME: change to masterAddress
  ownerEmail?: String
  whitelistedAddresses: Array<String>
  merkleRoot: string
}

export enum TemplateTier {
  FREE = 'free',
}

export type Claim = {
  contract: string
  tier: TemplateTier
  font: string | null
  primarycolor: string | null
  secondarycolor: string | null
  backgroundcolor: string | null
  artist: string
  description: string
  collection_email: string | null
  collection_twitter: string | null
  collection_discord: string | null
}
