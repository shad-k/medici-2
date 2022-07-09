import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { readyToTransact } from '../../utils/web3'
import NetworkIcon from './NetworkIcon'
import WalletMenu from './WalletMenu'
import { Button } from '@mui/material'

import useWallet from '../../hooks/useWallet'
import { useWallets } from '@web3-onboard/react'

const Header: React.FC<{}> = () => {
  const { wallet, connecting, connect } = useWallet()
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
      return;
    }
    async function setWalletFromLocalStorage() {
      const parsedPreviouslyConnectedWallets = JSON.parse(previouslyConnectedWallets!);
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
    connect({
      autoSelect: { 
        label: 'Wallet Connect',
        disableModals: false
      }
    })
  }

  return (
    <header className="h-16 w-full px-2 lg:px-0 py-4 fixed top-0 left-0 border-b-[0.5px] z-10 backdrop-blur-sm">
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
            <WalletMenu/>
          </div>
          ) : (
            <Button
        id="demo-customized-button"
        variant="contained"
        disableElevation
        onClick={onConnect}
        sx={{
          marginTop: '3px',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem'/* 20px */,
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          borderRadius: '1rem',
          fontSize: '0.875rem',
          fontWeight: 'light',
          textTransform: 'none',
          lineHeight: '1.25rem',
          '&:hover': {
            color: '#6618E4',
            backgroundColor: 'black',
          },}}
          >
            {connecting ? 'Connecting' : 'Connect Wallet'}
            </Button>
          )}
          {/* <RiShoppingCartLine size="30" className="hidden md:block" /> */}
        </div>
      </div>
    </header>
  )
}

export default Header
