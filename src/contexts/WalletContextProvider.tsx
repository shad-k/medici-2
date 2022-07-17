import React from 'react'
import { init, useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { GET_CHAIN_BY_HEX_ID } from '../model/chains'

import { WalletContextReturn } from '../model/types'

const injected = injectedModule()

const initialValue: WalletContextReturn = {
  connect: (options) => Promise.resolve(),
  disconnect: (options) => Promise.resolve(),
  wallet: null,
  connecting: false,
  settingChain: false,
  setChain: (options) => Promise.resolve(false),
  currentChain: null,
}

export const WalletContext = React.createContext(initialValue)

const onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '0xa',
      token: 'ETH',
      label: 'Optimistic Mainnet',
      rpcUrl: 'https://opt-mainnet.g.alchemy.com/v2/aZAch5n6Co6vvepI37ogK-QLiCmofL04',
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon Matic',
      rpcUrl: "https://polygon-mainnet.g.alchemy.com/v2/7-JPJoVkE3meApP_qeQ7SAfYCj_YthdR",
    },
    // {
    // id: '0x1',
    // token: 'ETH',
    // label: 'Ethereum Mainnet',
    // rpcUrl:
    //      'https://eth-mainnet.alchemyapi.io/v2/HB8dFHS6vY1h_LX3yZgyUYAj8Stv9Ja3',
    // },
    // {
    //   id: '0x2a',
    //   token: 'ETH',
    //   label: 'Kovan Testnet',
    //   rpcUrl:
    //     'https://eth-kovan.alchemyapi.io/v2/Nhwt0isGKmoL-652jwR15xcJgvUy59CD',
    // },
    {
      label: 'GOERLI',
      id: '0x5',
      token: 'GoerliETH',
      rpcUrl:
      'https://eth-goerli.alchemyapi.io/v2/cgHuBwD5rDkESlnFr3ee92PLMp3pkfyE',
    },
],
appMetadata: {
    name: 'Medici',
    icon: '<svg><svg/>',
    description: 'Regulus',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
      position: 'topRight'
    },
    mobile: {
      enabled: false,
      position: 'topRight',
    },
  },
})

const WalletContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ connectedChain, settingChain }, setChain] = useSetChain()
  const currentChain = connectedChain ? GET_CHAIN_BY_HEX_ID(connectedChain?.id) : null
  
  return (
    <WalletContext.Provider
      value={{
        wallet,
        connect,
        disconnect,
        connecting,
        setChain,
        settingChain,
        currentChain
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider
