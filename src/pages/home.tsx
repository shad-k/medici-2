import React from 'react'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home: React.FC<{}> = () => {
  return (
    <main
      className="bg-app bg-background text-text-primary w-screen h-screen bg-no-repeat font-sans bg-contain"
      style={{
        backgroundImage: "url('/background-illustration.svg')",
      }}
    >
      <div className="w-full lg:w-2/3 mx-auto h-full flex flex-col">
        <Header />
        <Hero />
        <Footer />
      </div>
    </main>
  )
}

export default Home
