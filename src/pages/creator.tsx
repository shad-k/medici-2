import React, { useState } from 'react'
import PageOne from '../components/Creator/PageOne';
import PageTwo from '../components/Creator/PageTwo';
import PageThree from '../components/Creator/PageThree';
import PageFour from '../components/Creator/PageFour';
import PageFive from '../components/Creator/PageFive';
import PageSix from '../components/Creator/PageSix';

const Creator: React.FC<{}> = () => {
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
      setParams((prevState: any) => ({
        ...prevState,
        [input]: value
    })); 
  }

  switch(step) {
    case 1:
      return (
          <PageOne nextStep={nextStep} handleInputData={handleInputData} data={params}/>
      );
    case 2: 
      return (
          <PageTwo nextStep={nextStep} handleInputData={handleInputData} data={params}/>
      );
    case 3:
      return (
          <PageThree nextStep={nextStep} handleInputData={handleInputData} data={params}/>
          );
    case 4:
      return (
        <PageFour nextStep={nextStep} handleInputData={handleInputData} data={params}/>
    );
    case 5:
      return (
        <PageFive nextStep={nextStep} handleInputData={handleInputData} data={params}/>
    );
    case 6: 
      return (
        <PageSix nextStep={nextStep} handleInputData={handleInputData} data={params}/>
    );
    default:
    return (
    <div className="App">
    </div>
    );
  }
}

export default Creator
