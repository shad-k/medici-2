import React from 'react'
import DashHero from '../components/HomeMenu'
import AllContracts from '../components/AllContracts'
import useWallet from '../hooks/useWallet'
import useAllLaunchedContracts from '../hooks/useAllLaunchedContracts'

const ProjectManager: React.FC<{}> = () => {
const { wallet, connect, setChain, connectedChain } = useWallet()
  return (
    <div className="w-full p-10 md:mt-10 flex flex-col items-center">
        <h1 className="text-center text-4xl font-semibold">
            All Projects
        </h1>
        <br></br>
        <span className="text-center md:w-3/5 font-extralight md:text-2xl text-zinc-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
        </span>
        { wallet && <AllContracts masterAddress={wallet.accounts[0].address}/> }
    </div>
  )
}

export default ProjectManager
