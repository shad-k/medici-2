import React, { useState } from 'react'
import InputDetails from '../components/CollectionCreator/InputDetails'
import UploadFiles from '../components/CollectionCreator/UploadFiles'
import ProjectDetails from '../components/CollectionCreator/ProjectDetails'

const Create: React.FC<{}> = () => {
  const [step, setStep] = useState<number>(1);

  const [params, setParams] = useState<any>({
    name: "",
    symbol: "",
    baseuri: "",
    maxSupply: "",
    price: "",
    maxMintsPerPerson: 0,
    masterAddress: "",
    merkleroot: "",
    coverImage: "",
    imageData: ""
  })

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleInputData = (input: any, value: string) => {
    // input value from the form
    console.log("Set " + input + " to " + value);
      setParams((prevState: any) => ({
        ...prevState,
        [input]: value
    })); 
  }

  switch(step) {
    case 1:
      return (
        <div className="w-full flex flex-col p-10 items-center md:mt-36">
            <h1 className="text-center text-4xl font-semibold">
                Create your Collection
            </h1>
            <br></br>
            <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
            </span>
            <br></br>
            <InputDetails nextStep={nextStep} handleInputData={handleInputData} data={params}/>
        </div>
      );
      case 2:
        return (
          <div className="w-full flex flex-col p-10 items-center md:mt-36">
          <h1 className="text-center text-4xl font-semibold">
          Create your Collection
          </h1>
          <br></br>
          <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
          </span>
          <UploadFiles nextStep={nextStep} handleInputData={handleInputData} data={params}/>
      </div>
      );
      case 3:
        return (
          <div className="w-full flex flex-col p-10 items-center md:mt-36">
          <h1 className="text-center text-4xl font-semibold">
          Create your Collection
          </h1>
          <br></br>
          <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
          </span>
          <ProjectDetails nextStep={nextStep} handleInputData={handleInputData} data={params}/>
      </div>
      );
      default:
      return (
        <div className="App">
        </div>
      );
  }
}

export default Create
