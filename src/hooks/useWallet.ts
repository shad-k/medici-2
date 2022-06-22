import React from 'react'
import { WalletContext } from '../contexts/WalletContextProvider'

const useWallet = () => {
  const { wallet, connecting, connect, connectedChain, settingChain, setChain } = React.useContext(WalletContext)

  return { wallet, connecting, connect, connectedChain, settingChain, setChain }
}

export default useWallet