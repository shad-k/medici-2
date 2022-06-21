
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
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38] space-y-3"
                >
                  <h1 className="text-2xl">Create</h1>
                  <h2 className="text-sm">Create an NFT collection with our Collection Creator. </h2>
                </Link>
                <Link
                to={`/projects`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38] space-y-3"
                >
                  <h1 className="text-2xl">Projects</h1>
                  <h2 className="text-sm">Withdraw your earnings from your projects. </h2>
                </Link>
                
                <Link
                to={`/launch`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38] space-y-3"
                >
                  <h1 className="text-2xl">Launch</h1>
                  <h2 className="text-sm">Launch a custom claim site for your project. </h2>
                </Link>
                <Link
                to={`/docs`}
                className="flex flex-col items-center md:items-start text-center sm:text-left relative px-4 py-4 h-[170px] rounded-lg text-medici-primary text-xl drop-shadow-lg transition duration-500 hover:scale-110 bg-[#2e2c38] space-y-3"
                >
                  <h1 className="text-2xl">Docs</h1>
                  <h2 className="text-sm">Check out documentation on how to effectively launch your NFT!</h2>
                </Link>
            </div>
        </section>
    );
}

export default HomeMenu