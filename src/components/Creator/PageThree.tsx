import React, { useState, useEffect } from 'react'
import { StepperFormProps } from '../../model/types';
import Modal from '@mui/material/Modal';

const PageThree: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [collectionMetadata, setCollectionMetadata] = useState<File>();

    useEffect(() => {
      if (showModal) {
        document.getElementById("modal-container")!.style.display = 'block'
      } else {
        document.getElementById("modal-container")!.style.display = 'none'
      }
    
    },[showModal])

    const onSubmit = () => {
        nextStep();
    }

    const uploadMetadata = async (file: File) => {
        setCollectionMetadata(file);
        /* upload metadata here */
        handleInputData("hasMetadata", true);
    }
    
    return (
    <div className="w-full flex flex-col items-center p-10 h-screen">
        <div className="text-center w-4/5 mt-52">
            <h1 className="bg-transparent text-[50px] inline w-fit text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500 font-semibold">Just for fun: bring your own metadata!</h1>
            <h2 className="text-zinc-500">If you have custom metadata for your collection, please upload it now.</h2>
        </div>
        <div className="flex flex-col space-y-4 m-10 items-center">
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[500px]" onClick={handleOpen}>Yes</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[500px]">No</button>
          <button className="bg-[#2e2c38] hover:bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl w-[500px]">What's that?</button>
        </div>
        <div id="modal-container" className="flex items-center justify-center text-center h-screen">
          <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
        <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl">Upload your metadata</h1>
          <h2 className="text-zinc-500"> We accept zip files only! </h2>
          <br></br>
            <div>
                <input
                    type="file"
                    name="collectionMetadata"
                    accept="image/png, image/gif, image/jpeg"
                    id="collectionMetadataField"
                    style={{'display': 'none'}}
                    onChange={(event) => uploadMetadata(event.target.files![0])}
                />
                <label htmlFor="collectionMetadataField">
                    <div className="flex w-full h-2/5 items-center">
                        <span className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">Upload Collection</span>
                    </div>
                </label>
            </div>
        </div>
        </Modal>
      </div>
      <div className="flex justify-end w-full absolute bottom-24 right-10">
        <button className="text-[#8E00FF] text-2xl" onClick={nextStep}>Next</button>
      </div>
    </div>
    );
}
export default PageThree