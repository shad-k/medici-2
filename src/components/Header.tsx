import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { readyToTransact } from '../utils/web3'

import useWallet from '../hooks/useWallet'
import NetworkIcon from './NetworkIcon'

const Header: React.FC<{}> = () => {
  // const { wallet, connecting, connectedChain, connect, setChain } = useWallet()
  const { wallet, connecting, connect, connectedWallets, connectedChain, settingChain, setChain } = useWallet();

  useEffect(() => {
    if (!connectedWallets) return
    else {

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
    }
  }, [connectedWallets])

  useEffect(() => {
    const previouslyConnectedWallets = window.localStorage.getItem("connectedWallets");
    if (!previouslyConnectedWallets) {
      console.log("No previously connected wallets, returning")
      return;
    }
    async function setWalletFromLocalStorage() {
      const parsedPreviouslyConnectedWallets = JSON.parse(previouslyConnectedWallets!);
      console.log("Connecting to previously connected wallet");
      await connect({ autoSelect: parsedPreviouslyConnectedWallets[0] })
    }
    setWalletFromLocalStorage()
  }, [connect])

  const location = useLocation()
  if (location.pathname.startsWith('/page/')) {
    return null
  }
  
  const connectedWallet = wallet?.accounts[0]
  
  const onConnect = async () => {
    connect({});
    console.log("wallet connected")
    await readyToTransact(connectedWallet, connect, setChain)
    console.log("ready to transact")
  }

  return (
    <header className="h-16 w-full px-2 lg:px-0 py-4 fixed top-0 left-0 border-t border-transparent z-10 header-bg">
      <div className="w-full md:w-4/5 mx-auto flex items-center justify-between h-full">
        <div className="flex items-center justify-center md:justify-between w-2/6">
          <Link to="/" className="flex align-center">
            <img src="/logo-medici.svg" alt="" className="mr-4" />
          </Link>
          {/* <Link to="/explore" className="hidden md:block">
            Explore
          </Link>
          <Link to="/about" className="hidden md:block">
            About
          </Link> */}
        </div>
        <div className="flex justify-end md:justify-end w-4/6">
          {connectedWallet ? (
          <div className="flex flex-row gap-1">
           <NetworkIcon/>
            <div className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white">
              {connectedWallet?.ens?.name ??
                `${connectedWallet?.address.slice(
                  0,
                  6
                )}...${connectedWallet?.address.slice(-6)}`}
            </div>
          </div>
          ) : (
            <button
              className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white disabled:cursor-not-allowed"
              onClick={() => onConnect()}
              disabled={connecting}
            >
              {connecting ? 'Connecting' : 'Connect Wallet'}
            </button>
          )}
          {/* <RiShoppingCartLine size="30" className="hidden md:block" /> */}
        </div>
      </div>
    </header>
  )
}

export default Header
