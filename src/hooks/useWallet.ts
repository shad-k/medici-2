import React from 'react'
import { WalletContext } from '../contexts/WalletContextProvider'

const useWallet = () => {
  const { wallet, connecting, connect, disconnect, settingChain, setChain, currentChain } = React.useContext(WalletContext)

  return { wallet, connecting, connect, disconnect, settingChain, setChain, currentChain }
}

export default useWallet