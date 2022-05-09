
import React from 'react'
import { utils } from 'ethers'
import Ethereum from './svgComponents/Ethereum';
import { Collection } from '../types'

const DashHero: React.FC<{ collection: Collection }> = ( { collection } ) => {

    return (
        <section className="w-full lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-10 px-10 md:px-0 md:ml-50 gap-3 md:gap-20">
            <div className="w-full md:w-3/5 order-1 text-center md:text-left flex flex-col items-center md:items-start md:ml-40 md:py-10">
                <h1 className="text-3xl md:text-5xl font-semibold">
                    Welcome to Regulus.
                </h1>
                <br></br>
                <span className="text-lg md:text-2xl font-extralight text-zinc-500 md:mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
                </span>
                <br></br>
                <div className="md:mt-10 inline-flex">
                    <Ethereum/>
                    <h1 className="text-1xl md:text-3xl mr-4 ml-3"> {parseFloat(utils.formatUnits(collection.balance, 'gwei')).toFixed(2)}</h1>
                    <h1 className="text-1xl md:text-3xl text-zinc-500">| temp val usd</h1>
                </div>
                <div className="ml-6 sm:w-full md:w-3/5 text-1xl text-zinc-500">
                    earned on your most recent project
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-2 order-2 justify-between items-center w-4/5">
                <button
                    className="ml-8 sm:ml-28 md:ml-0 text-left px-4 py-4 w-72 md:w-4/5 lg:w-10/12 rounded-lg text-medici-primary text-xl mt-12 bg-[#2e2c38] hover:bg-gradient-to-l from-medici-purple to-medici-purple-dark drop-shadow-lg transition duration-500 hover:scale-110"
                    onClick={()=>{ window.location.assign("/create")} }
                >
                    <h1>Create</h1>
                    <h2 className="text-sm mt-1"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit </h2>
                </button>
                
                <button className="ml-8 sm:ml-28 md:ml-0 text-left px-4 py-4 lg:h-30 w-72 md:w-4/5 lg:w-10/12 rounded-lg text-medici-primary text-xl mt-12 bg-[#2e2c38] hover:bg-gradient-to-l from-medici-purple to-medici-purple-dark drop-shadow-lg transition duration-500 hover:scale-110"
                >
                    <h1>Withdraw</h1>
                    <h2 className="text-sm mt-1"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit </h2>
                </button>
                
                <button
                    className="ml-8 sm:ml-28 md:ml-0 text-left px-4 py-4 h-30 w-72 md:w-4/5 lg:w-10/12 rounded-lg text-medici-primary text-xl mt-12 bg-[#2e2c38] hover:bg-gradient-to-l from-medici-purple to-medici-purple-dark drop-shadow-lg transition duration-500 hover:scale-110"
                    onClick={()=>{ window.location.assign("/launch")} }
                >
                    <h1>Launch Drop</h1>
                    <h2 className="text-sm mt-1"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit </h2>
                </button>
            </div>
        </section>
    );
}

export default DashHero