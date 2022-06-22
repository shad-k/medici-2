import React from 'react'
import { WalletContext } from '../contexts/WalletContextProvider'

const useWallet = () => {
  const { wallet, connecting, connect, disconnect, connectedChain, settingChain, setChain } = React.useContext(WalletContext)

  return { wallet, connecting, connect, disconnect, connectedChain, settingChain, setChain }
}

export default useWallet