import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC<{}> = () => {
  return (
    <header className="h-16 w-full bg-transparent p-4 flex items-center justify-between fixed top-0 left-0 w-full bg-background/10 z-10">
      <Link to="/" className="flex align-center">
        <img src="/logo-medici.svg" alt="" className="mr-4" />
      </Link>
      <button className="px-4 py-2 rounded-md bg-white text-black">
        Connect
      </button>
    </header>
  )
}

export default Header
