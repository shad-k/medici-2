import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import { triggerUploadImageData } from '../../utils/upload';

import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import { getMetadata } from '../../utils/retrieve';

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
    const [metadataFromIPFS, setMetadataFromIPFS] = useState<any>();

    const onSubmit = () => {
      // handleOpen();
      if (!imageUploadResponse) {
        alert("Please upload your project!")
      } else {
        nextStep();
      }
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
        formdata.append("isMetadataUploaded", data.isMetadataUploaded)
        if (!data.isMetadataUploaded) {
        formdata.append("renameFiles", "true")
        } else {
          formdata.append("renameFiles", "false")
        }
        setShowLoader(true)

        const res = await triggerUploadImageData(data.name, formdata, (progressEvent: any) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress);
        })
        setImageUploadResponse(res);
        const metadata = await getMetadata(res.randomMetadataURL);
        console.log(metadata)
        setMetadataFromIPFS(JSON.stringify(metadata, null, 2));
        await handleInputData("baseURI", res.baseURI);
        await handleInputData("maxSupply", res.totalSupply);
        setShowLoader(false);
        handleOpen()
      }
    }

    return (
      <div className="w-full flex flex-col items-center p-10 h-screen">
      <div className="text-center w-4/5 mt-10 md:mt-52">
          <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-transparent bg-clip-text text-[#9403fc] font-semibold">Upload your collection media</h1>
          <h2 className="text-zinc-500">This is where you upload the content for your collection. If you’re not sure about our format, check our docs here.</h2>
      </div>
      { !imageUploadResponse ?
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
      </div> :
      <div className="m-10">
        <div className="flex w-full h-2/5 items-center">
          <span className="bg-slate-500 p-3 rounded-3xl m-auto text-center whitespace-nowrap">Upload Collection</span>
        </div>
      </div>
      }
      <div className="flex justify-end w-full absolute bottom-24 right-10">
        <button className="text-[#8E00FF] text-2xl" onClick={onSubmit}>Next</button>
      </div>
      { showLoader && <div className="w-4/5">
      <h1>Hang tight!</h1>
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
      <div className="relative top-[20%] mx-auto p-5 w-96 h-[550px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none">
      <h1 className="text-center text-4xl mb-5">Upload Preview</h1>
      {imageUploadResponse && <img src={imageUploadResponse.randomImageURL}/>}
      {(imageUploadResponse && metadataFromIPFS) &&
      <div className="flex flex-col w-[300px] overflow-scroll border-[1px] border-white p-2 mt-3">
      <p>{JSON.stringify(metadataFromIPFS)}</p>
      </div>}
      {imageUploadResponse && <p>Total supply: {imageUploadResponse.totalSupply}</p>}
      </div>
      </Modal>
      </div>
    </div>
    );
}
export default PageFour
