import React from 'react'

const Hero: React.FC<{}> = () => {
  return (
    <section className="lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-20">
      <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start">
        <h1 className="text-3xl md:text-6xl">
          Launch Your Art
          <br />
          with Medici
        </h1>
        <button className="px-4 py-2 w-48 rounded-md bg-white text-black text-xl mt-12">
          Mint
        </button>
      </div>
      <img
        src="https://placeholder.pics/svg/150x300"
        alt="Medici"
        className="w-[450px] h-[500px] object-cover object-center order-1 md:order-2"
      />
    </section>
  )
}

export default Hero
