
import React from 'react'
import { Link } from 'react-router-dom'

const HomeMenu: React.FC<{}> = () => {
    return (
      <section className="w-full md:w-4/5 lg:w-3/5 m-auto flex flex-col items-center justify-center flex-1">
          <div className="flex flex-col md:grid grid-cols-2 grid-rows-2 auto-rows-max justify-center items-center gap-7 p-5">
            <Link
            to={`/create`}
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            >
              <h1 className="text-2xl">Create</h1>
              <h2 className="text-lg">Create an NFT collection with our Collection Creator. </h2>
            </Link>
            <Link
            to={`/projects`}
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            >
              <h1 className="text-2xl">Projects</h1>
              <h2 className="text-lg">Withdraw your earnings from your projects. </h2>
            </Link>
            
            <Link
            to={`/launch`}
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            >
              <h1 className="text-2xl">Launch</h1>
              <h2 className="text-lg">Launch a custom claim site for your project. </h2>
            </Link>
              <a 
                target="_blank"
                rel="noreferrer"
                href="https://docs.medicilabs.xyz/docs/intro"
                className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
              >
              <h1 className="text-2xl">Docs</h1>
              <h2 className="text-lg">Check out documentation on how to effectively launch your NFT!</h2>
              </a>
          </div>
        </section>
    );
}

export default HomeMenu