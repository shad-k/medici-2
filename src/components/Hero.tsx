import React from 'react'
import useCollections from '../hooks/useCollections'
import HeroCollectionCard from './HeroCollectionCard'

const Hero: React.FC<{}> = () => {
  const { data, error } = useCollections()
  if (!data && !error) {
    return null
  }

  const heroCollection = data[0]

  return (
    <section className="lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-20">
      <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start">
        <h1 className="text-3xl md:text-6xl">
          Launch Your Art
          <br />
          with Medici
        </h1>
        <a
          href="https://mint.medicilabs.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 w-56 rounded-full text-medici-primary text-xl mt-12 bg-gradient-to-l from-medici-purple to-medici-purple-dark"
        >
          Mint Your NFT Now
        </a>
      </div>
      <HeroCollectionCard collection={heroCollection} />
    </section>
  )
}

export default Hero
