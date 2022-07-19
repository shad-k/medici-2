import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import { triggerUploadMetadata, createZip } from '../../utils/upload';
import Modal from '@mui/material/Modal';
import { LinearProgress } from '@mui/material';

const PageThree: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [hasCustomMetadata, setHasCustomMetadata] = useState<boolean>(false);

    useEffect(() => {
      if (showModal) {
        document.getElementById("modal-container")!.style.display = 'block'
      } else {
        document.getElementById("modal-container")!.style.display = 'none'
      }
    
    },[showModal])

    const onSubmit = async () => {
      if (hasCustomMetadata === undefined) {
        alert("Please select an option!")
      } else {
      if (hasCustomMetadata === true) {
        await handleInputData("isMetadataUploaded", true);
      } else {
        await handleInputData("isMetadataUploaded", false);
      } 
      console.log(data);
      nextStep();
      }
    }

    // const uploadMetadata = async (file: File) => {
    //     setCollectionMetadata(file);
    //     /* upload metadata here */
    //     handleInputData("hasMetadata", true);
    // }

    const uploadMetadata = async (files: FileList) => {
      setUploadProgress(0);
      const file = files[0]
    
      if (files === null || files === undefined) {
        setShowLoader(false);
        return;
      } else if (file.name.endsWith(".zip")){
        alert("No zip files allowed!")
        return;
      }

      try {
        const formdata = new FormData();
        const zip = await createZip(files);
        const zipFile = new File([zip], "metadata", {type: "application/zip"});
        formdata.append("metadata", zipFile)
        setShowLoader(true)
      
        const res = triggerUploadMetadata(data.name, formdata, (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress);
        });
        console.log(res);
        setHasCustomMetadata(true);
        setShowLoader(false);
      } catch {
        alert("Something went wrong!")
        setShowLoader(false);
      }
    }
    
    return (
    <div className="w-full flex flex-col items-center p-10 h-screen">
        <div className="text-center w-4/5 mt-10 md:mt-52">
            <h1 className="text-[50px]">✨<span className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-transparent bg-clip-text text-[#9403fc] font-semibold">Bring Your Own Metadata</span>✨</h1>
            <h2 className="text-zinc-500">If you have custom metadata for your project, please upload it now.</h2>
            <h2 className="text-zinc-500"> If not don't worry, we'll generate some for you!</h2>
        </div>
        <div className="flex flex-col space-y-4 m-10 items-center">          
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br hover:from-medici-purple hover:to-medici-purple-dark focus:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]" onClick={event => setHasCustomMetadata(false)}>No</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]" onClick={handleOpen}>Yes</button>
          <a href="https://docs.medicilabs.xyz/docs/Minting/overview#collection-upload" target="_blank"  className="bg-[#2e2c38] hover:bg-gradient-to-br text-center from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[450px] sm:w-[500px]" rel="noreferrer">What's that?</a>
        </div>
        <div id="modal-container" className="hidden items-center justify-center text-center h-screen">
          <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
        <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl">Upload your metadata</h1>
          <h2 className="text-zinc-500">We accept images, folders, and zip files!</h2>
          <br></br>
            <div>
                <input
                    type="file"
                    name="collectionMetadata"
                    id="collectionMetadataField"
                    style={{'display': 'none'}}
                    onChange={(event) => uploadMetadata(event.target.files!)}
                />
                <label htmlFor="collectionMetadataField">
                    { !hasCustomMetadata &&
                    <div className="flex w-full h-2/5 items-center">
                        <span className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">Upload Metadata</span>
                    </div>
                    }
                    <br></br>
                    { showLoader && <div className="w-full">
                    <LinearProgress
                    id="progress-loader"
                    variant="determinate"
                    value={uploadProgress}
                    sx={{backgroundColor: "#33313d", 
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: '#6618E4'}}}
                    />
                    </div>
                    }
                    {hasCustomMetadata &&
                        <p>Metadata upload success!</p>
                    }
                </label>
            </div>
        </div>
        </Modal>
      </div>
      <div className="flex justify-end w-full absolute bottom-24 right-10">
        <button className="text-[#8E00FF] text-2xl" onClick={onSubmit}>Next</button>
      </div>
    </div>
    );
}
export default PageThree
