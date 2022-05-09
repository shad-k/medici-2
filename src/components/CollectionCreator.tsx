import React, { useState, useEffect } from 'react'
import { BigNumber, utils } from 'ethers'

const CollectionCreator: React.FC<{}> = () => {
    const [CoverImage, setCoverImage] = useState<File>()
    const [ImageUrl, setImageUrl] = useState<string>()
    const [CollectionTitle, setCollectionTitle] = useState<string>()
    const [CollectionSize, setCollectionSize] = useState<number>()
    const [LinkToCollection, setLinkToCollection] = useState<string>()
    const [FloorPrice, setFloorPrice] = useState<BigNumber>()
    const [TokenType, setTokenType] = useState<string>()
     
  useEffect(() => {
    if (CoverImage) {
      setImageUrl(URL.createObjectURL(CoverImage));
    }
  }, [CoverImage]);

    return (
        <div className="grid gap-20 grid-rows-1 md:grid-cols-2 mt-10 md:mt-20">
        <input
            type="file"
            name="CoverImage"
            accept="image/png, image/gif, image/jpeg"
            id="CoverImageField"
            style={{'display': 'none'}}
            onChange={(event) => setCoverImage(event.target.files![0])}
        />
        <label htmlFor="CoverImageField">
        { ImageUrl && CoverImage ? 
        <div className="w-full aspect-square">
            <img className="w-full rounded-2xl aspect-square object-cover" src={ImageUrl}/>
        </div>
        : 
        <div className="w-full aspect-square rounded-2xl min-w-[280px] text-center flex flex-col items-center border-dotted border-2 border-zinc-100/100">
            <svg className="inline-block mt-36 mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="inline-block align-middle order-3 px-5 py-2 rounded-2xl text-sm disabled:cursor-not-allowed">Upload a cover image</span>
        </div>
        }
        </label>
        <form className="w-full max-w-lg order-2">
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-bold mb-2" htmlFor="grid-first-name">
                Title
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="My Collection" onChange={(event) => setCollectionTitle(event.target.value)}/>
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-bold mb-2" htmlFor="grid-last-name">
                Size
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="100" min="0" onChange={(event) => setCollectionSize(parseInt(event.target.value))}/>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-bold mb-2" htmlFor="grid-password">
                Link to S3 bucket
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="link" onChange={(event) => setLinkToCollection(event.target.value)}/>
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2 min-w-full">
            <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-bold mb-2" htmlFor="grid-city">
                Price
                </label>
                <input className="inline-flex appearance-none mr-5 w-10/12 md:w-3/5 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="0.0 ETH" min="0" onChange={(event) => setFloorPrice(utils.parseUnits(event.target.value, "ether"))}/>
                ETH
            </div>
            
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 text-md font-bold mb-2" htmlFor="grid-state">
                Type
                </label>
                <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={ (event) => setTokenType(event.target.value) }>
                    <option>ERC-721</option>
                    <option>ERC-1155</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                </div>
            </div>
            </div>
            <button className="mt-10 order-3 px-5 py-2 rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed">Submit</button>
        </form>
        </div>
    );
}

export default CollectionCreator