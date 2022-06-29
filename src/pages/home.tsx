import React, { useEffect } from 'react'
import HomeMenu from '../components/home/HomeMenu'
import AlphaBanner from '../components/home/AlphaBanner'
import useWallet from '../hooks/useWallet'
import StarryBackground from '../components/home/StarryBackground'

const Home: React.FC<{}> = () => {
  return (
    <div className="pb-20">
      <div className="w-full flex flex-col p-5 items-center">
      <AlphaBanner/>
        <div className="whitespace-nowrap">
          <h1 className="text-center text-[34px] md:text-6xl font-semibold">
          ✨ <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">Launch Your Project</span> ✨
          </h1>
        </div>
        <br></br>
        <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-300">
        Create customizable NFT smart contracts and claim pages! 
        </span>
      <br></br>
      </div> 
      <HomeMenu/>
      </div>
  )
}

export default Home
