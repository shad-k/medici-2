import React, {useState} from 'react'
import DashHero from '../components/DashHero'
import DashActive from '../components/DashActive'
import DashMintList from '../components/DashMintList'
import useTestHook from '../hooks/useTestHook'

const Home: React.FC<{}> = () => {
  const data = useTestHook()
  if (!data) {
    return null
  }

  return (
      <div className="w-full mx-auto h-full flex flex-col">
      {data && <DashHero/>}
       <br></br>
      {data && <DashActive/>}
      <br></br>
      </div> 
  )
}

export default Home
