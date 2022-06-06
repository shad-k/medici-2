import React from 'react'
import HomeMenu from '../components/HomeMenu'

const Home: React.FC<{}> = () => {

  return (
      <div className="w-full flex flex-col p-10 items-center md:mt-10">
          <h1 className="text-center text-4xl font-semibold ">
          ✨ <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">Launch Your Project</span> ✨
          </h1>
          <br></br>
          <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
          Create customizable NFT smart contracts and claim pages! 
          </span>
          {/* <div className="md:mt-10 inline-flex">
              <Ethereum/>
              <h1 className="text-1xl md:text-3xl mr-4 ml-3"> {parseFloat(utils.formatUnits(collection.balance, 'gwei')).toFixed(2)}</h1>
              <h1 className="text-1xl md:text-3xl text-zinc-500">| temp val usd</h1>
          </div>
          <div className="ml-6 sm:w-full md:w-3/5 text-1xl text-zinc-500">
              earned on your most recent project
          </div> */}
      {<HomeMenu/>}
       <br></br>
     
      {/* {data && <DashActive/>} */}
      {/* {data.data} */}
      <br></br>
      </div> 
  )
}

export default Home
