
import React from 'react'
import Ethereum from './svgComponents/Ethereum';
import { Collection } from '../model/types'
import { Link } from 'react-router-dom'
import { IoMdRocket } from 'react-icons/io'
import { BsEaselFill, BsPiggyBank } from 'react-icons/bs';
import { BiTestTube } from 'react-icons/bi'

const HomeMenu: React.FC<{}> = () => {

    return (
        <section className="w-full md:w-4/5 lg:w-3/5 m-auto flex flex-col items-center justify-center flex-1 md:p-10 mt-10 md:mt-5">
            <div className="grid grid-cols-2 grid-rows-2 justify-center items-center gap-5 w-4/5">
                <Link
                to={`/create`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38]"
                >
                    <BsEaselFill size={90} color="C537AB" className="sm:hidden mt-[15%]"/>
                    <h1 className="text-2xl hidden sm:block">Create</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Create an NFT collection with our Collection Creator. </h2>
                </Link>
                <Link
                to={`/projects`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38]"
                >
                    <BsPiggyBank size={90} color="6a00f4" className="sm:hidden mt-[15%]"/>
                    <h1 className="text-2xl hidden sm:block">Projects</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Withdraw your earnings from your projects. </h2>
                </Link>
                
                <Link
                to={`/launch`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38]"
                >
                    <IoMdRocket size={90} color="f72585" className="sm:hidden mt-[15%]"/>
                    <h1 className="text-2xl hidden sm:block">Launch</h1>
                    <h2 className="text-sm hidden sm:block mt-2"> Launch a custom claim site for your project. </h2>
                </Link>
                <Link
                to={`/demo`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38]"
                >
                    <BiTestTube size={90} color="3f37c9" className="sm:hidden mt-[15%]"/>
                    <h1 className="text-2xl hidden sm:inline">Create</h1><span className="text-sm hidden sm:inline">(fun) ✨</span>
                    <h2 className="text-sm hidden sm:block mt-2"> Try a demo launch on the Kovan test network. </h2>
                </Link>
            </div>
        </section>
    );
}

export default HomeMenu