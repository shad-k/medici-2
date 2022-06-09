import React from 'react'
import { StepperFormProps } from '../../model/types';

const PageOne: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {

const onSubmit = () => {
    nextStep();

}

return (
    <div className="w-full flex flex-col items-center h-screen p-10">
        <div className="m-auto text-center w-4/5">
            <span className="text-[60px] text-center font-semibold">I want to launch</span>
            <select id="collection-type" className="bg-transparent text-[60px] inline w-fit text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold p-2" onChange={event => handleInputData("collection_type", event.target.value)}>
                <option>art</option>
                <option>music</option>
                <option>video</option>
            </select>
            <span className="text-[60px] text-center font-semibold">NFTs that are all </span>
            <select id="token-type" className="bg-transparent text-[60px] inline w-fit text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold" onChange={event => handleInputData("token_type", event.target.value)}>
                <option>different</option>
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