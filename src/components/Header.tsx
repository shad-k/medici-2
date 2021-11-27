import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC<{}> = () => {
  return (
    <header className="h-16 w-full bg-transparent py-4">
      <Link to="/" className="flex align-center">
        <img src="/logo.svg" alt="" className="mr-4" />
        <h5 className="text-xl">Medici Labs</h5>
      </Link>
    </header>
  )
}

export default Header
