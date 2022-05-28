import React, {useState, useEffect} from 'react'
import { useReward } from 'react-rewards';
import ContractsMenu from '../components/ContractsMenu'
import '../css/dropeditor.css'
import { ColorPicker } from 'material-ui-color';

import useWallet from '../hooks/useWallet'
import apiClient from '../utils/apiClient';
import { CONFIG } from '../utils/config';


const DropEditor: React.FC<{}> = () => {
    const localenv = CONFIG.DEV

    const { wallet, connecting, connect, connectedChain, setChain } = useWallet();
    const [ params, setParams ] = useState({
        address: "",
        font: "",
        primarycolor: "",
        secondarycolor: "",
        backgroundcolor: "",
        artist: "",
        description: "",
        collection_email: "",
        collection_twitter: "",
        collection_discord: ""
    })
    const [primaryColor, setPrimaryColor] = useState<any>();
    const [secondaryColor, setSecondaryColor] = useState<any>();
    const [bgColor, setBgColor] = useState<any>();
    const [ClaimCreationSuccess, setClaimCreationSuccess] = useState(false);

    const { reward, isAnimating } = useReward('input-form', 'confetti');

    const handleInputData = (input: any, value: string) => {
        // input value from the form
        console.log("Set " + input + " to " + value);
          setParams((prevState: any) => ({
            ...prevState,
            [input]: value
        })); 
    }

    const onConfirm = async() => {
        try { 
            handleInputData("primarycolor", primaryColor.hex)
            handleInputData("secondarycolor", secondaryColor.hex)
            handleInputData("bgcolor", bgColor.hex)
            console.log(params);
        } catch {
            alert("Error! Missing fields")
            return
        }
        await apiClient.post(
            localenv.api.paths.launchClaim,
            params,
            {
                headers: {"Content-Type": "application/json"}
            }
        ).then(function(response) {
            console.log(response)
            setClaimCreationSuccess(true)
            reward()
        }).catch(function(error) {
            console.log(error)
            setClaimCreationSuccess(false)
        });
    }
    
    return (
        <div className="w-full flex flex-col p-10 items-center">
        <h1 className="text-center text-4xl font-semibold">
            Launch a project
        </h1>
        <br></br>
        <span className="md:w-3/5 text-center font-extralight md:text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
        </span>
        <br></br>
        { !wallet && <p>Please connect your wallet to see all your available projects.</p>}
        { wallet && <ContractsMenu masterAddress={wallet.accounts[0].address} handleInputData={handleInputData}/>}
        <br></br>
        <form id="input-form" className="grid grid-cols-2">
            <label htmlFor="input-artist" className="block lg:text-2xl py-2">Artist</label>
            <input id="input-artist" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none mb-10" onChange={event => handleInputData("artist", event.target.value)}/>
            <label htmlFor="input-description" className="block lg:text-2xl py-2">Description</label>
            <textarea id="input-description" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none mb-10" onChange={event => handleInputData("description", event.target.value)}/>
            <label htmlFor="input-twitter" className="block lg:text-2xl py-2">Collection Twitter</label>
            <input id="input-twitter" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none mb-10" onChange={event => handleInputData("collection_twitter", event.target.value)}/>
            <label htmlFor="input-discord" className="block lg:text-2xl py-2">Collection Discord</label>
            <input id="input-discord" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none mb-10" onChange={event => handleInputData("collection_discord", event.target.value)}/>
            <label htmlFor="input-email" className="block lg:text-2xl py-2">Collection Email</label>
            <input id="input-email" type="email" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2  outline-none mb-10" onChange={event => handleInputData("collection_email", event.target.value)}/>
        </form>
        <br></br>
            <div className="flex flex-row">
                <div id="primary-color-picker" className="mx-6">
                <label htmlFor="primary-color-picker" className="block lg:text-2xl py-2">Primary Color</label>
                    <ColorPicker value={primaryColor} hideTextfield onChange={event => setPrimaryColor(event)} />
                    { primaryColor && <p>#{primaryColor.hex}</p>}
                </div>
                <br></br>
                <div id="secondary-color-picker" className="mx-6">
                <label htmlFor="secondary-color-picker" className="block lg:text-2xl py-2">Secondary Color</label>
                    <ColorPicker value={secondaryColor} hideTextfield onChange={event => setSecondaryColor(event)} />
                    { secondaryColor && <p>#{secondaryColor.hex}</p>}
                </div>
                <div id="bg-color-picker" className="mx-6">
                <label htmlFor="bg-color-picker" className="block lg:text-2xl py-2">Background Color</label>
                    <ColorPicker value={bgColor} hideTextfield onChange={event => setBgColor(event)} />
                    { bgColor && <p>#{bgColor.hex}</p>}
                </div>
            </div>
            <div className="text-center mt-10">
                <button id="confirm-button" className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]" onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    );
}

export default DropEditor