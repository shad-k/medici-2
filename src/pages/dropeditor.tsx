import React, {useState, useEffect} from 'react'
import { useReward } from 'react-rewards';
import ContractsMenu from '../components/ContractsMenu'
import '../css/dropeditor.css'
import { ColorPicker } from 'material-ui-color';
import FontPicker from 'font-picker-react'

import useWallet from '../hooks/useWallet'
import apiClient from '../utils/apiClient';
import { CONFIG } from '../utils/config';
import { claimsInit } from '../utils/web3';


const DropEditor: React.FC<{}> = () => {
    const localenv = CONFIG.DEV

    const { wallet, connecting, connect, connectedChain, setChain } = useWallet();
    const [contract, setContract] = useState<string>();
    const [artist, setArtist] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [twitter, setTwitter] = useState<string>();
    const [discord, setDiscord] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [primaryColor, setPrimaryColor] = useState<any>();
    const [secondaryColor, setSecondaryColor] = useState<any>();
    const [bgColor, setBgColor] = useState<any>();
    const [activeFontFamily, setActiveFontFamily] = useState<string>("Open Sans");
    const [claimTier, setClaimTier] = useState<any>();
    const [AllFieldsValid, setAllFieldsValid] = useState<boolean>(false);
    const [ClaimCreationSuccess, setClaimCreationSuccess] = useState(false);

    const { reward, isAnimating } = useReward('input-form', 'confetti');

    useEffect(() => {
        if (contract && artist && description && twitter && email && discord && primaryColor && secondaryColor && bgColor && activeFontFamily) {
            setAllFieldsValid(true)
        } else {
            setAllFieldsValid(false)
        }
    }, [contract, artist, description, twitter, discord, email, primaryColor, secondaryColor, bgColor, activeFontFamily, AllFieldsValid, setAllFieldsValid])

    const onConfirm = async() => {
        if (AllFieldsValid) {
            const claimReady = await claimsInit(wallet, contract!, claimTier);

            if (claimReady) {
                const params = {
                    "contract": contract,
                    "font": activeFontFamily,
                    "primarycolor": primaryColor.hex,
                    "secondarycolor": secondaryColor.hex,
                    "backgroundcolor": bgColor.hex,
                    "artist": artist,
                    "description": description,
                    "email": email,
                    "twitter": twitter,
                    "discord": discord,        
                }

            apiClient.post(
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
    } else {
        alert("Missing some fields!")
    }
}
    
    return (
        <div className="w-full flex flex-col p-10 items-center">
        <h1 className="text-center text-4xl font-semibold">
            Launch Claim Site
        </h1>
        <br></br>
        <span className="md:w-3/5 text-center font-extralight md:text-2xl text-zinc-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere, nunc id bibendum viverra, justo elit dictum erat, sed consequat elit 
        </span>
        <br></br>
        { wallet ? <ContractsMenu masterAddress={wallet.accounts[0].address} handleInputData={setContract}/> : <p>Please connect your wallet to see all your available projects.</p>}
        <form id="input-form" className="grid md:grid-cols-2 gap-5">
            <div>
                <label htmlFor="input-artist" className="block lg:text-2xl py-2">Artist</label>
                <input id="input-artist" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none" onChange={event => setArtist(event.target.value)}/>
            </div>
            <div>
            <label htmlFor="input-description" className="block lg:text-2xl py-2">Description</label>
            <textarea id="input-description" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none" onChange={event => setDescription(event.target.value)}/>
            </div>
            <div>
            <label htmlFor="input-twitter" className="block lg:text-2xl py-2">Collection Twitter</label>
            <input id="input-twitter" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none" onChange={event => setTwitter(event.target.value)}/>
            </div>
            <div>
            <label htmlFor="input-discord" className="block lg:text-2xl py-2">Collection Discord</label>
            <input id="input-discord" type="text" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2 outline-none" onChange={event => setDiscord(event.target.value)}/>
            </div>
            <div>
            <label htmlFor="input-email" className="block lg:text-2xl py-2">Collection Email</label>
            <input id="input-email" type="email" className="text-white text-2xl p-2 rounded-2xl bg-transparent border-2  outline-none" onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="text-black mt-10">
            <FontPicker
                    apiKey={process.env.REACT_APP_GOOGLE_FONTS_API_KEY!}
                    activeFontFamily={activeFontFamily}
                    onChange={(nextFont: any) =>
                        setActiveFontFamily(nextFont.family)
                    }
                />
            </div>
            <div>
            <label htmlFor="tier-select" className="block lg:text-2xl py-2">Tier </label>
            <select id="tier-select" className="text-black w-full" onChange={event => setClaimTier(event.target.value)}>
                <option>free</option>
                <option>low</option>
                <option disabled={true}>mid (coming soon!)</option>
                <option disabled={true}>high (coming soon!)</option>
            </select>
            </div>
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
                { AllFieldsValid ? <button id="confirm-button" className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]" onClick={onConfirm}>Confirm</button> : <button className="bg-zinc-500 p-3 rounded-3xl w-2/5 min-w-[100px]">Confirm</button> }
            </div>
        </div>
    );
}

export default DropEditor