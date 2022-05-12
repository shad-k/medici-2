import React from 'react'
import type { ConnectOptions } from '@web3-onboard/core'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

import { WalletContextReturn } from '../model/types'

const injected = injectedModule()

const initialValue: WalletContextReturn = {
  connect: (options: ConnectOptions) => Promise.resolve(),
  wallet: null,
  connecting: false,
}

export const WalletContext = React.createContext(initialValue)

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl:
        'https://eth-mainnet.alchemyapi.io/v2/HB8dFHS6vY1h_LX3yZgyUYAj8Stv9Ja3',
    },
  ],
  appMetadata: {
    name: 'Medici',
    icon: '<svg><svg/>',
    description: 'NFT Marketplace',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
})

const WalletContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [{ wallet, connecting }, connect] = useConnectWallet()

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connect,
        connecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider