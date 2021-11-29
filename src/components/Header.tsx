import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC<{}> = () => {
  return (
    <header className="h-16 w-full bg-transparent py-4">
      <Link to="/" className="flex align-center">
        <img src="/logo-medici.svg" alt="" className="mr-4" />
      </Link>
    </header>
  )
}

export default Header
