import React from 'react'

const Hero: React.FC<{}> = () => {
  return (
    <section className="lg:w-4/5 m-auto flex justify-center flex-1 py-20">
      <img
        src="https://placeholder.pics/svg/600x300"
        alt="Medici"
        className="w-full object-contain object-top"
      />
    </section>
  )
}

export default Hero
