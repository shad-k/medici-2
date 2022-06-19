import React, { useState } from 'react'
import InputDetails from '../components/CollectionCreator/InputDetails'
import UploadFiles from '../components/CollectionCreator/UploadFiles'
import ProjectDetails from '../components/CollectionCreator/ProjectDetails'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';

import { IoMdCreate } from 'react-icons/io'
import { RiUploadLine } from 'react-icons/ri';
import { MdPriceChange } from 'react-icons/md';

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

  const handleInputData = (input: any, value: string): Promise<boolean> => {
    // input value from the form
    setParams((prevState: any) => ({
        ...prevState,
        [input]: value
    })); 
    return Promise.resolve(true)
  }

  const steps = [
    'Name your collection',
    'Upload images',
    'Set collection details'
  ]

  const CustomStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ ownerState }) => ({
    backgroundColor: '#2e2c38',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage: 'linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
  }));
  
  function CustomStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    const icons: { [index: string]: React.ReactElement } = {
      1: <IoMdCreate/>,
      2: <RiUploadLine />,
      3: <MdPriceChange />,
    };
  
    return (
      <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </CustomStepIconRoot>
    );
  }

  switch(step) {
    case 1:
      return (
        <div className="w-full flex flex-col p-10 items-center md:mt-10">
            <h1 className="text-center text-4xl font-semibold">
                Create your Collection
            </h1>
            <br></br>
            <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
            </span>
            <div className="p-3">
            <Stepper activeStep={step-1}>
            {steps.map((label) => (
               <Step key={label}>
               <StepLabel StepIconComponent={CustomStepIcon}><span className="text-white font-sans text-[12px]">{label}</span></StepLabel>
             </Step>
            ))}
            </Stepper>
            </div>
            <InputDetails nextStep={nextStep} handleInputData={handleInputData} data={params}/>
        </div>
      );
      case 2:
        return (
          <div className="w-full flex flex-col p-10 items-center md:mt-10">
          <h1 className="text-center text-4xl font-semibold">
          Create your Collection
          </h1>
          <br></br>
          <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
          </span>
          <div className="p-3">
            <Stepper activeStep={step-1}>
            {steps.map((label) => (
               <Step key={label}>
               <StepLabel StepIconComponent={CustomStepIcon}><span className="text-white font-sans text-[12px]">{label}</span></StepLabel>
             </Step>
            ))}
            </Stepper>
            </div>
          <br></br>
          <UploadFiles nextStep={nextStep} handleInputData={handleInputData} data={params}/>
      </div>
      );
      case 3:
        return (
          <div className="w-full flex flex-col p-10 items-center md:mt-10">
          <h1 className="text-center text-4xl font-semibold">
          Create your Collection
          </h1>
          <br></br>
          <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
          </span>
          <div className="p-3">
            <Stepper activeStep={step-1}>
            {steps.map((label) => (
               <Step key={label}>
               <StepLabel StepIconComponent={CustomStepIcon}><span className="text-white font-sans text-[12px]">{label}</span></StepLabel>
             </Step>
            ))}
            </Stepper>
          </div>
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
