import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import { triggerUploadImageData } from '../../utils/claims';

import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import { getGatewayURL, getMetadata } from '../../utils/metadata';

const PageFour: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [imageUploadResponse, setImageUploadResponse] = useState<any>();
    const [metadataFromIPFS, setMetadataFromIPFS] = useState<string>();

    const onSubmit = () => {
      // handleOpen();
      console.log(data)
      nextStep();
    }

    useEffect(() => {
      if (showModal) {
        document.getElementById("modal-container")!.style.display = 'block'
      } else {
        document.getElementById("modal-container")!.style.display = 'none'
      }
    
    },[showModal])

    const uploadImageData = async (file: File) => {
      setUploadProgress(0);
    
      if (file === null || file === undefined) {
        setShowLoader(false);
        return;
      } else {
        const formdata = new FormData();
        formdata.append("images", file)
        setShowLoader(true)
  
        await triggerUploadImageData(data.name, data.isMetadataUploaded, formdata, (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress);
        }).then(response => {
          console.log(response);
          setImageUploadResponse(response);
          handleInputData("baseURI", response.baseURI);
          handleInputData("maxSupply", response.totalSupply);
          setShowLoader(false);
          handleOpen()
        });
        const metadata = await getMetadata(imageUploadResponse.randomMetadataURL);
        setMetadataFromIPFS(metadata);
      }
    }

    return (
      <div className="w-full flex flex-col items-center p-10 h-screen">
      <div className="text-center w-4/5 mt-10 md:mt-52">
          <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Upload your collection media</h1>
          <h2 className="text-zinc-500">This is where you upload the content for your collection. If you’re not sure about our format, check our docs here.</h2>
      </div>
      <div className="m-10">
        <input
            type="file"
            name="collectionImageData"
            accept=".zip"
            id="collectionImageDataField"
            style={{'display': 'none'}}
            onChange={(event) => uploadImageData(event.target.files![0])}
        />
        <label htmlFor="collectionImageDataField">
            <div className="flex w-full h-2/5 items-center">
                <span className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">Upload Collection</span>
            </div>
        </label>
      </div>
      <div className="flex justify-end w-full absolute bottom-24 right-10">
        <button className="text-[#8E00FF] text-2xl" onClick={onSubmit}>Next</button>
      </div>
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
      <div id="modal-container" className="flex items-center justify-center text-center h-screen">
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <div className="relative top-[10%] mx-auto p-5 w-96 h-[700px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none">
      {imageUploadResponse && <img src={getGatewayURL(imageUploadResponse.randomImageURL)}/>}
      {imageUploadResponse && <p>{metadataFromIPFS}</p>}
      {imageUploadResponse && <p>Total supply: {imageUploadResponse.totalSupply}</p>}
      </div>
      </Modal>
      </div>
    </div>
    );
}
export default PageFour