import React, {useState} from 'react'
import DashHero from '../components/DashHero'
import DashActive from '../components/DashActive'
import DashMintList from '../components/DashMintList'
import useTestActiveProject from '../hooks/useTestActiveProject'

const Home: React.FC<{}> = () => {
  const data = useTestActiveProject()
  if (!data) {
    return null
  }


  return (
    <div className="w-full mx-auto h-full flex flex-col">
       <DashHero collection={data}/>
       <br></br>
       <DashActive collection={data}/>
       <br></br>
       <DashMintList collection={data}/>
    </div>
  )
}

export default Home
