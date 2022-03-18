import React from 'react'
import { WalletContext } from '../components/WalletContextProvider'

const useWallet = () => {
  const { wallet, connecting, connect } = React.useContext(WalletContext)

  return { wallet, connecting, connect }
}

export default useWallet
