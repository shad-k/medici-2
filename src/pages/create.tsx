import React, {useState, useEffect} from 'react'
import CollectionCreator from '../components/CollectionCreator'

const Create: React.FC<{}> = () => {

  return (
    <section className="w-full lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-10 px-10 md:px-0 md:ml-50 gap-3 md:gap-20">
    <div className="w-full md:w-8/12 order-1 text-center md:text-left flex flex-col items-center md:items-start md:ml-40 py-10">
        <h1 className="text-3xl md:text-5xl font-semibold">
            Create your Collection
        </h1>
        <br></br>
        <span className="font-extralight text-lg md:text-2xl text-zinc-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
        </span>
    <CollectionCreator/>
    </div>
    </section>
  );
}

export default Create
