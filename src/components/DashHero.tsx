
import React from 'react'
import Ethereum from './svgComponents/Ethereum';

const DashHero: React.FC<{ earnings: string }> = ( { earnings } ) => {

    return (
        <section className="w-full lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-10 px-10 md:px-0 md:ml-50 gap-3 md:gap-20">
            <div className="w-full md:w-3/5 order-1 text-center md:text-left flex flex-col items-center md:items-start md:ml-40 py-10">
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Welcome to Regulus.
                </h1>
                <br></br>
                <span className="font-extralight text-lg text-zinc-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
                </span>
                <br></br>
                <div className="mt-10 inline-flex">
                    <Ethereum/>
                    <h1 className="text-1xl md:text-3xl mr-4 ml-3">{earnings} </h1>
                    <h1 className="text-1xl md:text-3xl text-zinc-500">| temp val usd</h1>
                </div>
                <div className="ml-6 sm:w-full md:w-3/5 text-1xl text-zinc-500">
                    earned on your most recent project
                </div>
            </div>
            <div className="grid gap-0 md:gap-2 grid-cols-1 grid-rows-2 order-2 justify-between items-center md:items-start">
                <span
                    className="px-4 py-4 h-30 w-72 md:w-3/5 lg:w-7/12 rounded-lg text-medici-primary text-xl mt-12 bg-gradient-to-l from-medici-purple to-medici-purple-dark drop-shadow-lg"
                >
                    <h1>Create</h1>
                    <h2 className="text-xs"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit </h2>
                </span>
                
                <span className="px-4 py-4 h-30 w-72 md:w-3/5 lg:w-7/12 rounded-lg text-medici-primary text-xl mt-12 bg-gradient-to-l from-medici-purple to-medici-purple-dark drop-shadow-lg"
                >
                    <h1>Withdraw</h1>
                    <h2 className="text-xs"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit </h2>
                </span>
            </div>
        </section>
    );
}

export default DashHero