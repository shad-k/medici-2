import React from 'react'
import { init, useConnectWallet, useSetChain } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

import { WalletContextReturn } from '../model/types'

const injected = injectedModule()

const initialValue: WalletContextReturn = {
  connect: (options) => Promise.resolve(),
  wallet: null,
  connecting: false,
  connectedChain: null,
  settingChain: false,
  setChain: (options) => Promise.resolve(false),
}

export const WalletContext = React.createContext(initialValue)

const onboard = init({
wallets: [injected],
chains: [
  // {
  //   id: '0xA',
  //   token: 'ETH',
  //   label: 'Optimistic Mainnet',
  //   rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/aZAch5n6Co6vvepI37ogK-QLiCmofL04'
  // }
    // {
    // id: '0x1',
    // token: 'ETH',
    // label: 'Ethereum Mainnet',
    // rpcUrl:
    //      'https://eth-mainnet.alchemyapi.io/v2/HB8dFHS6vY1h_LX3yZgyUYAj8Stv9Ja3',
    // },
    {
      id: '0x2a',
      token: 'ETH',
      label: 'Kovan Testnet',
      rpcUrl: 'https://eth-kovan.alchemyapi.io/v2/Nhwt0isGKmoL-652jwR15xcJgvUy59CD',
    }
],
appMetadata: {
    name: 'Medici',
    icon: '<svg><svg/>',
    description: 'Lyra',
    recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    ],
},
accountCenter: {
  desktop: {
      enabled: false,
      position: 'topRight',
  },
  mobile: {
    enabled: false,
    position: 'topRight',
},
}
})

const WalletContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connect,
        connecting,
        connectedChain,
        setChain,
        settingChain
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider