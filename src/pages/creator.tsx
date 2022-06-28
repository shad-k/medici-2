import React, { useState } from 'react';
import PageOne from '../components/creator/PageOne';
import PageTwo from '../components/creator/PageTwo';
import PageThree from '../components/creator/PageThree';
import PageFour from '../components/creator/PageFour';
import PageFive from '../components/creator/PageFive';
import PageSix from '../components/creator/PageSix';
import AlphaBanner from '../components/home/AlphaBanner';

const Creator: React.FC<{}> = () => {
  const [step, setStep] = useState<number>(1);

  const [params, setParams] = useState<any>({
    collection_type: '',
    token_type: '',
    name: '',
    symbol: '',
    isMetadataUploaded: '',
    baseURI: '',
    maxSupply: '',
    price: '',
    maxMintsPerPerson: '',
    masterAddress: '',
    merkleRoot: '',
    claimStartBlock: '',
    mintStartBlock: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const handleInputData = async (
    input: any,
    value: string
  ): Promise<boolean> => {
    // input value from the form
    setParams((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
    return Promise.resolve(true);
  };

  switch (step) {
    case 1:
      return (
        <div className="mt-56">
          <PageOne
            nextStep={nextStep}
            handleInputData={handleInputData}
            data={params}
          />
        </div>
      );
    case 2:
      return (
        <PageTwo
          nextStep={nextStep}
          handleInputData={handleInputData}
          data={params}
        />
      );
    case 3:
      return (
        <PageThree
          nextStep={nextStep}
          handleInputData={handleInputData}
          data={params}
        />
      );
    case 4:
      return (
        <PageFour
          nextStep={nextStep}
          handleInputData={handleInputData}
          data={params}
        />
      );
    case 5:
      return (
        <PageFive
          nextStep={nextStep}
          handleInputData={handleInputData}
          data={params}
        />
      );
    case 6:
      return (
        <PageSix
          nextStep={nextStep}
          handleInputData={handleInputData}
          data={params}
        />
      );
    default:
      return <div className="App"></div>;
  }
};

export default Creator;
