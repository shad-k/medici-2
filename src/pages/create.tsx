import React, {useState, useEffect} from 'react'

const Create: React.FC<{}> = () => {
  const [NFTImage, setNftImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    if (NFTImage) {
      setImageUrl(URL.createObjectURL(NFTImage));
    }
  }, [NFTImage]);


  return (
    <section className="w-full lg:w-4/5 m-auto flex flex-col md:flex-row items-center justify-between flex-1 py-10 px-10 md:px-0 md:ml-50 gap-3 md:gap-20">
    <div className="w-full md:w-3/5 order-1 text-center md:text-left flex flex-col items-center md:items-start md:ml-40 py-10">
        <h1 className="text-3xl md:text-4xl font-semibold">
            Create your Project
        </h1>
        <br></br>
        <span className="font-extralight text-lg text-zinc-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
        </span>
        <br></br>
        <input
          type="file"
          name="nftImage"
          accept="image/png, image/gif, image/jpeg"
          id="nftImageField"
          style={{'display': 'none'}}
          onChange={(event) => setNftImage(event.target.files![0])}
        />
        <label htmlFor="nftImageField">
        { imageUrl && NFTImage ? 
        <div className="w-60 h-60">
            <img className="w-60 h-60 object-cover" src={imageUrl}/>
        </div>
        : 
        <div className="w-60 h-60 border-dotted border-2 border-zinc-100/100">
            <span className="inline-block align-middle">Upload your file here</span>
        </div>
        }
        </label>
        <form className="w-full max-w-lg order-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Collection Title
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Collection Size
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Link to S3 bucket
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="link"/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Floor Price
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                Token Type
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>ERC-721</option>
                  <option>ERC-1155</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                Zip
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
            </div>
          </div>
        </form>
  <br></br>
  <button className="order-3 px-5 py-2 rounded-2xl text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white disabled:cursor-not-allowed">Submit
  </button>
  </div>
  </section>
  );
}

export default Create
