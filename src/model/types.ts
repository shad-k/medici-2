import type {
  ConnectOptions,
  DisconnectOptions,
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
  txhash: string
  chainid: string
  claimsstart: number
  mintstart: number
}

export type WalletContextReturn = {
  connect: (options: ConnectOptions) => Promise<void>
  disconnect: (options: DisconnectOptions) => Promise<void>
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
  price: string
  maxMintsPerPerson: number
  masterAddress: string
  claimStartBlock: string
  mintStartBlock: string
}

export interface StepperFormProps {
  nextStep: () => void
  handleInputData: (input: any, value: any) => Promise<boolean>
  data: any
}

export enum TemplateTier {
  FREE = 'free',
  LOW = 'low',
}

export type Claim = {
  contract: string
  tier: TemplateTier | null
  fontFamily: string | null
  primaryColor: string | null
  secondaryColor: string | null
  bgColor: string | null
  artist: string
  description: string
  email: string | null
  twitter: string | null
  discord: string | null
  chainid: string
}

export enum Accordions {
  DETAIL = 'detail',
  SOCIAL = 'social',
  FONT = 'font',
  TIER = 'tier',
  COLORS = 'colors',
}

export type FormState = {
  contract: string
  artist: string
  description: string
  twitter: string
  discord: string
  email: string
  primaryColor: string
  secondaryColor: string
  bgColor: string
  fontFamily: string
  tier: TemplateTier | null
  chainid: string
}

export type ChainConfigReturn = {
  network: string
  url: string
  factory: string
  claims: string
}

export interface Chain {
  namespace?: 'evm'
  id: string
  rpcUrl: string
  label: string
  token: string
  color?: string
  icon?: string
}
