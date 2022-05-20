
import React from 'react'
import Ethereum from './svgComponents/Ethereum';
import { Collection } from '../model/types'
import { Link } from 'react-router-dom'
import { IoMdRocket } from 'react-icons/io'
import { BsEaselFill, BsPiggyBank } from 'react-icons/bs';
import { BiTestTube } from 'react-icons/bi'

const DashHero: React.FC<{}> = () => {

    return (
        <section className="w-full md:w-11/12 lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-10 px-10 md:px-0 md:gap-20">
            <div className="w-full md:w-2/5 order-1 text-center md:text-left flex flex-col items-center md:items-start">
                <h1 className="text-3xl md:text-4xl font-semibold">
                    Welcome to Regulus.
                </h1>
                <br></br>
                <span className="text-lg md:text-2xl font-extralight text-zinc-500 md:mt-5 leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
                </span>
                {/* <div className="md:mt-10 inline-flex">
                    <Ethereum/>
                    <h1 className="text-1xl md:text-3xl mr-4 ml-3"> {parseFloat(utils.formatUnits(collection.balance, 'gwei')).toFixed(2)}</h1>
                    <h1 className="text-1xl md:text-3xl text-zinc-500">| temp val usd</h1>
                </div>
                <div className="ml-6 sm:w-full md:w-3/5 text-1xl text-zinc-500">
                    earned on your most recent project
                </div> */}
            </div>
            <div className="grid grid-cols-2 grid-rows-2 order-2 justify-between items-center w-4/5 md:w-3/5 gap-5 mt-12">
                <Link
                to={`/create`}
                className="text-center sm:text-left relative px-4 py-4 w-40 sm:w-52 md:w-4/5 lg:w-10/12 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38]"
                >
                    <BsEaselFill size={90} color="C537AB" className="m-[15%] sm:hidden "/>
                    <h1 className="text-2xl hidden sm:block">Create</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Create an NFT collection with our Collection Creator. </h2>
                </Link>
                <Link
                to={`/create`}
                className="text-center sm:text-left px-4 py-4 w-40 sm:w-52 md:w-4/5 lg:w-10/12 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38]"
                >
                    <BsPiggyBank size={90} color="6a00f4" className="m-[15%] sm:hidden"/>
                    <h1 className="text-2xl hidden sm:block">Withdraw</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Withdraw your earnings from your projects. </h2>
                </Link>
                
                <Link
                to={`/launch`}
                className="text-center sm:text-left px-4 py-4 w-40 sm:w-52 md:w-4/5 lg:w-10/12 h-[170px] rounded-lg text-medici-primary text-xl bg-[#2e2c38] drop-shadow-lg transition duration-500 hover:scale-110"
                >
                    <IoMdRocket size={90} color="f72585" className="m-[15%] sm:hidden"/>
                    <h1 className="text-2xl hidden sm:block">Launch</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Launch a custom claim site for your minters. </h2>
                </Link>
                <Link
                to={`/demo`}
                className="text-center sm:text-left px-4 py-4 w-40 sm:w-52 md:w-4/5 lg:w-10/12 h-[170px] rounded-lg text-medici-primary text-xl bg-[#2e2c38] drop-shadow-lg transition duration-500 hover:scale-110"
                >
                    <BiTestTube size={90} color="3f37c9" className="m-[15%] sm:hidden"/>
                    <h1 className="text-2xl hidden sm:block">Demo</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Try a demo launch on the Kovan test network. </h2>
                </Link>
            </div>
        </section>
    );
}

export default DashHero