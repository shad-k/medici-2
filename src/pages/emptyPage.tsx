import React from 'react'
import AlphaBanner from '../components/home/AlphaBanner'
import { Link } from 'react-router-dom'

const EmptyPage: React.FC<{}> = () => {

  return (
    <div>
    <AlphaBanner/>
      <div className="w-full flex flex-col p-5 items-center">
          <div className="whitespace-nowrap">
            <h1 className="text-center text-4xl md:text-6xl font-semibold">
            <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">Invalid Route</span>
            </h1>
          </div>
          <br></br>
          <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
          This is not a valid route!
          </span>
          <br></br>
          <Link
            to={`/`}
            className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">Return to Home
          </Link>
          </div>
      </div>
  )
}

export default EmptyPage
