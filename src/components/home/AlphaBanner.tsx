import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';

const AlphaBanner:React.FC<{}> = () => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const handleOpen = () => setShowAlert(true);
  const handleClose = () => setShowAlert(false);
  return (
    <div className="p-10">
    <Collapse in={showAlert}>
      <Alert severity="info" onClose={() => {handleClose()}} icon={false} sx={{backgroundColor: "#201F27", color: "#cacaca", boxShadow: "0.8"}}>
      <AlertTitle>Info</AlertTitle>
      Caution: This is Alpha Software. Although Contracts have been tested rigorously, we do not have a formal audit yet and features may be in flux.
      </Alert>
    </Collapse>
    </div>
  )
}
export default AlphaBanner