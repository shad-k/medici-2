import React, {useEffect, useState} from 'react'
import DashHero from '../components/DashHero'
import AllContracts from '../components/AllContracts'
import useWallet from '../hooks/useWallet'
import useAllLaunchedContracts from '../hooks/useAllLaunchedContracts'

const Home: React.FC<{}> = () => {
  const { wallet, connecting, connect, connectedChain, setChain } = useWallet()

  return (
      <div className="w-full mx-auto h-full flex flex-col">
      {<DashHero/>}
       <br></br>
      { wallet && <AllContracts masterAddress={wallet.accounts[0].address}/> }
      {/* {data && <DashActive/>} */}
      {/* {data.data} */}
      <br></br>
      </div> 
  )
}

export default Home
