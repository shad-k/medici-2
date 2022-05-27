import React, {useState, useEffect} from 'react'
import { StepperFormProps } from '../../model/types';
import validator from 'validator';
import { BsFillCheckSquareFill, BsFillXSquareFill } from 'react-icons/bs'
import { utils } from 'ethers'
import { checkNameAvailability } from '../../utils/web3';

const InputDetails: React.FC<StepperFormProps> = ({
  nextStep,
  handleInputData,
  data
}) => {
  const [error, setError] = useState(false);
  const [isNameAvailable, setIsNameAvailable] = useState(false);
  const [showNameLoader, setShowNameLoader] = useState(false);
  const [isValidMasterAddress, setIsValidMasterAddress] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e: any) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(data.name) ||
      validator.isEmpty(data.symbol) ||
      validator.isEmpty(data.masterAddress)
    ) {
      setError(true);
      alert("Please double check your input!");
    } else {   
      (document.getElementById("input-name") as HTMLInputElement).disabled = true;
      (document.getElementById("input-symbol") as HTMLInputElement).disabled = true;
      (document.getElementById("input-master") as HTMLInputElement).disabled = true;
      nextStep();
    }
  };

  const addressCheck = (address: string) => {
    try {
      const addressCheck = utils.getAddress(address);
      handleInputData("masterAddress", addressCheck);
      setIsValidMasterAddress(true)
    } catch {
      setIsValidMasterAddress(false)
    }
  }

  /* FIX NAME VALIDATION LATER */
  
  // const nameCheck = async (name: string) => {
  //   try {
  //     console.log("Checking name availability for " + name)
  //     const isNameAvailable = await checkNameAvailability(name);
  //     if (isNameAvailable) {
  //       handleInputData("name", name);
  //       setIsNameAvailable(true);
  //     } else {
  //       setIsNameAvailable(false);
  //     }
  //   } catch {
  //     setError(true)
  //     alert("There was an error")
  //   }
  // }

  return (
    <div className="w-full md:w-2/5 md:text-left flex flex-col mt-10">
          <label htmlFor="input-name" className="block lg:text-2xl py-2">Collection Title</label>
          <input id="input-name" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none" onChange={event => handleInputData("name", event.target.value)}/>
          {/* {isNameAvailable ? <p>Name is available!</p> : <p>This name is not available, please try another name!</p>} */}
          <br></br>
              <label htmlFor="input-symbol" className="block lg:text-2xl py-2">Symbol</label>
              <input id="input-symbol" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none" onChange={event => handleInputData("symbol", event.target.value)}/>
          <br></br>
            <label htmlFor="input-master" className="block lg:text-2xl py-2">Master Address</label>
              <div className="inline-flex gap-4 w-full">
                <input id="input-master" type="text" className="text-white md:text-2xl p-2 rounded-2xl bg-transparent border-2 border-zinc-500 outline-none w-11/12" onChange={event => addressCheck(event.target.value)}/>
                {isValidMasterAddress ? <BsFillCheckSquareFill className="mt-3" size="30px" color="green"/> : <BsFillXSquareFill className="mt-3" size="30px" color="#F47174"/>}
              </div>
          <br></br>
          <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]" onClick={submitFormData}>Next</button>
          </div>
    </div>
  );
}

export default InputDetails
