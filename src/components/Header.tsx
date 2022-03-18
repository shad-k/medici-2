import React from 'react'
import { Link } from 'react-router-dom'
import useWallet from '../hooks/useWallet'

const Header: React.FC<{}> = () => {
  const { wallet, connecting, connect } = useWallet()

  const connectedWallet = wallet?.accounts[0]

  return (
    <header className="h-16 w-full bg-transparent py-4 fixed top-0 left-0 bg-background/10 z-10">
      <div className="w-full md:w-4/5 mx-auto flex items-center justify-between">
        <Link to="/" className="flex align-center">
          <img src="/logo-medici.svg" alt="" className="mr-4" />
        </Link>
        {connectedWallet ? (
          <div className="px-4 py-2 rounded-md bg-white text-black">
            {connectedWallet?.ens?.name ??
              `${connectedWallet?.address.slice(
                0,
                6
              )}...${connectedWallet?.address.slice(-6)}`}
          </div>
        ) : (
          <button
            className="px-4 py-2 rounded-md bg-white text-black disabled:cursor-not-allowed"
            onClick={() => connect({})}
            disabled={connecting}
          >
            {connecting ? 'Connecting' : 'Connect'}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
