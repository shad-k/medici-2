import React, {useState, useEffect} from 'react'
import { useReward } from 'react-rewards';
import ContractsMenu from '../components/ContractsMenu'
import '../css/dropeditor.css'
import { ColorPicker } from 'material-ui-color';
import FontPicker from 'font-picker-react'
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import useWallet from '../hooks/useWallet'
import apiClient from '../utils/apiClient';
import { CONFIG } from '../utils/config';
import { Contract } from '../model/types'
import { claimsInit } from '../utils/web3';
import { types } from 'util';


const DropEditor: React.FC<{}> = () => {
    const localenv = CONFIG.DEV

    const { wallet, setChain, connect } = useWallet();
    const [contract, setContract] = useState<Contract>();
    const [artist, setArtist] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [twitter, setTwitter] = useState<string>();
    const [discord, setDiscord] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [primaryColor, setPrimaryColor] = useState<string>();
    const [secondaryColor, setSecondaryColor] = useState<string>();
    const [bgColor, setBgColor] = useState<string>();
    const [activeFontFamily, setActiveFontFamily] = useState<string>("Open Sans");
    const [claimTier, setClaimTier] = useState<any>("free");
    const [AllFieldsValid, setAllFieldsValid] = useState<boolean>(false);
    const [ClaimCreationSuccess, setClaimCreationSuccess] = useState(false);

    const { reward, isAnimating } = useReward('claim-page-button', 'confetti', {elementCount: 200, elementSize:10});

    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        if (showModal) {
          document.getElementById("modal-container")!.style.display = 'block'
        } else {
          document.getElementById("modal-container")!.style.display = 'none'
        }
      
    },[showModal])
      

    useEffect(() => {
        if (contract && artist && description && twitter && email && discord && (primaryColor != undefined) && (secondaryColor != undefined) && (bgColor != undefined) && activeFontFamily && claimTier) {
            setAllFieldsValid(true)
        } else {
            setAllFieldsValid(false)
        }
    }, [contract, artist, description, twitter, discord, email, primaryColor, secondaryColor, bgColor, activeFontFamily, AllFieldsValid, setAllFieldsValid])

    const readyToTransact = async (): Promise<boolean> => {
        if (!wallet) {
            await connect({});
        }
        return setChain({ chainId: localenv.network.id })
      }
    
    const onConfirm = async() => {
        if (AllFieldsValid && await readyToTransact()) {
            handleOpen();
            const claimReady = await claimsInit(wallet, contract!.contractaddress, claimTier);

            if (claimReady) {
                const params = {
                    "contract": contract!.contractaddress,
                    "font": activeFontFamily,
                    "primarycolor": primaryColor,
                    "secondarycolor": secondaryColor,
                    "backgroundcolor": bgColor,
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
                    <ColorPicker value={primaryColor} hideTextfield onChange={event => setPrimaryColor("#"+event.hex)} />
                    { primaryColor && <p>{primaryColor}</p>}
                </div>
                <br></br>
                <div id="secondary-color-picker" className="mx-6">
                <label htmlFor="secondary-color-picker" className="block lg:text-2xl py-2">Secondary Color</label>
                    <ColorPicker value={secondaryColor} hideTextfield onChange={event => setSecondaryColor("#"+event.hex)} />
                    { secondaryColor && <p>{secondaryColor}</p>}
                </div>
                <div id="bg-color-picker" className="mx-6">
                <label htmlFor="bg-color-picker" className="block lg:text-2xl py-2">Background Color</label>
                    <ColorPicker value={bgColor} hideTextfield onChange={event => setBgColor("#"+event.hex)} />
                    { bgColor && <p>{bgColor}</p>}
                </div>
            </div>
            <div className="text-center mt-10">
                { AllFieldsValid ? <button id="confirm-button" className="bg-gradient-to-r from-fuchsia-500 to-blue-500 p-3 rounded-3xl w-2/5 min-w-[100px]" onClick={onConfirm}>Confirm</button> : <button className="bg-zinc-500 p-3 rounded-3xl w-2/5 min-w-[100px]">Confirm</button> }
            </div>
            <div id="modal-container" className="flex items-center justify-center text-center h-screen">
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <div id="claim-modal" className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center">
                { (ClaimCreationSuccess) ? <h1 className="text-center text-2xl">Congratulations!</h1> : <h1>Generating your claim page</h1>}
                <br></br>
                { (ClaimCreationSuccess && contract) ? <a href={"/page/" + contract.name}><span id="claim-page-button" className="bg-medici-purple text-white  p-3 rounded-3xl w-2/5 min-w-[100px]">Claim page</span></a> : <CircularProgress sx={{color: '#B81CD4'}}/>}
            </div>
            </Modal>
        </div>
        </div>
    );
}

export default DropEditor