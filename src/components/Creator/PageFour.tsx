import React, { useState } from 'react'
import { StepperFormProps } from '../../model/types';
import { triggerUploadImageData } from '../../utils/claims';
import { LinearProgress } from '@mui/material';

const PageFour: React.FC<StepperFormProps> = ({
    nextStep,
    handleInputData,
    data
}) => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [ImageDataProgress, setImageDataProgress] = useState<number>(0);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    const uploadImageData = async (file: File) => {
      setImageDataProgress(0);
    
      if (file === null || file === undefined) {
        setShowLoader(false);
        return;
      } else {
          try {
            const formdata = new FormData();
            formdata.append("images", file)
            setShowLoader(true)
          
            const res = triggerUploadImageData(data.name, data.hasMetadata ,formdata, (progressEvent: any) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setImageDataProgress(progress);
            });
            /* FIXME: getting base uri from response from uploading collection data */
            console.log(res);
            setShowLoader(false);
          } catch {
            alert("Something went wrong!")
            setShowLoader(false);
          }
      }
    }

    return (
      <div className="w-full flex flex-col items-center p-10 h-screen">
      <div className="text-center w-4/5 mt-52">
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
                <span className="bg-gradient-to-br from-medici-purple to-medici-purple-dark p-3 rounded-3xl m-auto text-center whitespace-nowrap">Upload Cover</span>
            </div>
        </label>
      </div>
      <div className="flex justify-end w-full absolute bottom-24 right-10">
        <button className="text-[#8E00FF] text-2xl" onClick={nextStep}>Next</button>
      </div>
      { showLoader && <div className="w-full">
      <LinearProgress
        id="progress-loader"
        variant="determinate"
        value={ImageDataProgress}
        sx={{backgroundColor: "#33313d", 
        "& .MuiLinearProgress-bar": {
          backgroundColor: '#6618E4'}}}
      />
      </div>
      }
    </div>
    );
}
export default PageFour