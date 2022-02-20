import React from 'react'
import Hero from '../components/Hero'
import Collections from '../components/Collections'

const Home: React.FC<{}> = () => {
  return (
    <div className="w-full mx-auto h-full flex flex-col">
      <Hero />
      <Collections />
    </div>
  )
}

export default Home
