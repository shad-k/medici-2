import React from 'react'
import { StepperFormProps } from '../../model/types';
import useWallet from '../../hooks/useWallet';

/* FIXME: rename components */
const PageOne: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
  const { wallet, connect } = useWallet()

const onSubmit = async () => {
  console.log(data)
  try {
    if (!wallet) {
      await connect({
        autoSelect: { 
          label: 'Wallet Connect',
          disableModals: false
        }
      })
      nextStep();
    }
    else {
      nextStep();
    }
  } catch {
    alert("Please connect your wallet!")
  }
}

return (
    <div className="w-full flex flex-col items-center mt-16">
        <div className="m-auto text-center w-3/5">
            <span className="text-[40px] md:text-[60px] text-center font-semibold">I want to launch</span>
            <select id="collection-type" className="bg-transparent text-[40px] md:text-[60px] inline text-center text-[#9403fc] font-semibold p-2 w-[250px]" onChange={event => handleInputData("collection_type", event.target.value)}>
                <option>image</option>
                <option className="w-3/5">music</option>
                <option disabled={true} className="w-3/5">video - coming soon</option>
            </select>
            <span className="text-[40px] md:text-[60px] text-center font-semibold">NFTs that are all </span>
            <select id="token-type" className="bg-transparent text-[40px] md:text-[60px] inline w-fit text-center tracking-wide text-transparent bg-clip-text text-[#9403fc] font-semibold" onChange={event => handleInputData("token_type", event.target.value)}>
                <option>unique</option>
                <option>identical</option>
            </select>
            <div className="block m-10">
              <button className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[100px]" onClick={onSubmit}>Let's go!</button>
            </div>
        </div>
        
    </div>
    );
}
export default PageOne
