import React from 'react'
import { Link } from 'react-router-dom'
// import { MdSearch } from 'react-icons/md'
// import { RiShoppingCartLine } from 'react-icons/ri'
import { ethers } from 'ethers'

import useWallet from '../hooks/useWallet'

const Header: React.FC<{}> = () => {
  const { wallet, connecting, connect } = useWallet()

  const connectedWallet = wallet?.accounts[0]
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(
    Boolean(localStorage.getItem('signature'))
  )

  const signIn = async () => {
    if (wallet) {
      try {
        const provider = new ethers.providers.Web3Provider(wallet.provider)
        const signer = await provider.getSigner()
        const signature = await signer.signMessage(
          'Sign this message to access. Nonce: 1'
        )
        console.log('signature', signature)
        localStorage.setItem('signature', JSON.stringify(true))
        setIsSignedIn(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <header className="h-16 w-full px-2 lg:px-0 py-4 fixed top-0 left-0 bg-black/10 border-t border-transparent z-10">
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
        <div className="flex items-center justify-end md:justify-end w-3/6">
          {/* <div className="border border-medici-primary rounded-2xl flex items-center px-2 py-1 hidden md:flex">
            <MdSearch size="25" />
            <input
              type="text"
              placeholder="Search..."
              className="border-none outline-none bg-transparent placeholder:text-medici-primary placeholder:text-sm ml-2"
            />
          </div> */}
          {connectedWallet ? (
            isSignedIn ? (
              <div className="px-5 py-2 rounded-2xl text-sm bg-white text-medici-purple">
                {connectedWallet?.ens?.name ??
                  `${connectedWallet?.address.slice(
                    0,
                    6
                  )}...${connectedWallet?.address.slice(-6)}`}
              </div>
            ) : (
              <button
                className="px-5 py-2 rounded-2xl text-sm bg-white text-medici-purple disabled:cursor-not-allowed"
                onClick={signIn}
                disabled={connecting}
              >
                Sign In
              </button>
            )
          ) : (
            <button
              className="px-5 py-2 rounded-2xl text-sm bg-white text-medici-purple disabled:cursor-not-allowed"
              onClick={() => connect({})}
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
