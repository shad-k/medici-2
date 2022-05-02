import React from 'react'
import DashHero from '../components/DashHero'
import DashActive from '../components/DashActive'
import DashMintList from '../components/DashMintList'
import useCollections from '../hooks/useCollections'

const Home: React.FC<{}> = () => {
  const { data, error } = useCollections()
  if (!data && !error) {
      return null
  }

  const currCollection = data[0]

  return (
    <div className="w-full mx-auto h-full flex flex-col">
       <DashHero earnings={"5.00"}/>
       <br></br>
       {
         currCollection ? <DashActive collection={currCollection}/> : <div>Hello</div>
       }
       <br></br>
       <DashMintList collection={currCollection}/>
    </div>
  )
}

export default Home
