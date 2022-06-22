import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { readyToTransact } from '../utils/web3'
import NetworkIcon from './NetworkIcon'

import useWallet from '../hooks/useWallet'
import { useWallets } from '@web3-onboard/react'

const Header: React.FC<{}> = () => {
  const { wallet, connecting, connectedChain, connect, disconnect, setChain } = useWallet()
  const connectedWallets = useWallets();

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets, wallet])

  useEffect(() => {
    const previouslyConnectedWallets = window.localStorage.getItem("connectedWallets");
    if (!previouslyConnectedWallets) {
      console.log("No previously connected wallets, returning")
      return;
    }
    async function setWalletFromLocalStorage() {
      const parsedPreviouslyConnectedWallets = JSON.parse(previouslyConnectedWallets!);
      console.log("Connecting to previously connected wallet");
      console.log(parsedPreviouslyConnectedWallets);
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
  }

  const onDisconnect = async () => {
    if (wallet) {
      await disconnect({label: wallet!.label});
      window.localStorage.removeItem('connectedWallets');
    }
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
            <button
              id="connected-button"
              className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white"
              onClick={() => onDisconnect()}
            >
              {connectedWallet?.ens?.name ??
                `${connectedWallet?.address.slice(
                  0,
                  6
                )}...${connectedWallet?.address.slice(-6)}`}
            </button>
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
