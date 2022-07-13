import React, { useEffect, useState, useCallback } from 'react'
import useWallet from '../../hooks/useWallet';
import { utils } from 'ethers'

import Modal from '@mui/material/Modal';
import { Contract, Chain } from '../../model/types'
import { getContract, getContractForTransactions } from '../../utils/web3';

const ProjectPopup: React.FC<{showModal: boolean, handleClose: any, contract: Contract, chain: Chain, action: string}> = ({showModal, handleClose, contract, chain, action}) => {
  
  const { wallet } = useWallet()
  const [newBaseURI, setNewBaseURI] = useState<string>()
  const [currClaimBlock, setCurrClaimBlock] = useState<number>()
  const [currMintBlock, setCurrMintBlock] = useState<number>()
  const [newMintBlock, setNewMintBlock] = useState<string>()
  const [newClaimBlock, setNewClaimBlock] = useState<string>()
  const [newPrice, setNewPrice] = useState<string>()
  const [newOwnerAddress, setNewOwnerAddress] = useState<string>()
  const [newMaxMintsPerPerson, setNewMaxMintsPerPerson] = useState<string>()

  const getCurrentClaimBlock = useCallback(async () => {
    const currContract = await getContract(contract.contractaddress, chain)
    const claimBlockVal = await currContract.claimsStartBlock()
    console.log("Current claim block: " + claimBlockVal)
    setCurrClaimBlock(claimBlockVal)
  }, [chain, contract])

  const getCurrentMintBlock = useCallback(async () => {
    const currContract = await getContract(contract.contractaddress, chain)
    const mintBlockVal = await currContract.mintStartBlock()
    console.log("Current mint block: " + mintBlockVal)
    setCurrMintBlock(mintBlockVal)
  }, [chain, contract])

  const onChangeBaseURI = async () => {
    console.log("Changing base URI")
    if (contract && newBaseURI) {
      try {
      const myContract = await getContractForTransactions(wallet, contract.contractaddress)
      console.log(myContract)
      await myContract.changeBaseURI(newBaseURI)
      } catch (error: any) {
        if (error.message) {
          alert(error.message)
        } else {
          alert('Something went wrong, please try again!')
        }
      }
    }
  }

  const onSetClaimBlock = async () => {
    console.log("Setting claim block")
    if (contract && newClaimBlock) {
    try {
      const myContract = await getContractForTransactions(wallet, contract.contractaddress)
      console.log(myContract)
      await myContract.changeClaimsPeriodStart(newClaimBlock)
    } catch (error: any) {
      if (error.message) {
        alert(error.message)
      } else {
        alert('Something went wrong, please try again!')
      }
    }
    }
  }

  const onSetMintBlock = async () => {
    console.log("Setting mint block")
    if (contract && newMintBlock) {
      try {
      const myContract = await getContractForTransactions(wallet, contract.contractaddress)
      console.log(myContract)
      await myContract.changeMintPeriodStart(newMintBlock)
      } catch (error: any) {
        if (error.message) {
          alert(error.message)
        } else {
          alert('Something went wrong, please try again!')
        }
      }
    }
  }

  const onChangePrice = async () => {
    console.log("Changing price")
    if (contract && newPrice) {
      try {
      const myContract = await getContractForTransactions(wallet, contract.contractaddress)
      console.log(myContract)
      await myContract.changePrice(utils.parseUnits(newPrice, 'ether'))
      } catch (error: any) {
        if (error.message) {
          alert(error.message)
        } else {
          alert('Something went wrong, please try again!')
        }
      }
    }
  }

  const onTransferOwnership = async () => {
    console.log("Changing ownership")
    if (contract && newOwnerAddress) {
      try {
      const myContract = await getContractForTransactions(wallet, contract.contractaddress)
      console.log(myContract)
      await myContract.transferOwnership(newOwnerAddress)
      } catch (error: any) {
        if (error.message) {
          alert(error.message)
        } else {
          alert('Something went wrong, please try again!')
        }
      }
    }
  }

  const onSetMaxMintsPerPerson = async () => {
    if (contract && newMaxMintsPerPerson) {
      try {
        const myContract = await getContractForTransactions(wallet, contract.contractaddress)
        await myContract.changeMaxMintPerPerson(newMaxMintsPerPerson)
        } catch (error: any) {
          if (error.message) {
            alert(error.message)
          } else {
            alert('Something went wrong, please try again!')
          }
      }
    }
  }

  useEffect(() => {
    if (!currClaimBlock) getCurrentClaimBlock()
    if (!currMintBlock) getCurrentMintBlock()
  
  }, [contract, getCurrentClaimBlock, getCurrentMintBlock, currClaimBlock, currMintBlock])

  switch(action) {
  
  case ("changeBaseURI"): 
    return (
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
      <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none space-y-5">
        <label htmlFor="input-field">New Base URI</label>
        <input id="input-field" className="text-black rounded-sm p-2" onChange={event => setNewBaseURI(event.target.value)}></input>
        <button className="bg-medici-purple p-3 rounded-2xl" onClick={() => onChangeBaseURI()}>Submit</button>
      </div>
      </Modal>
    )
  case ("changePrice"): 
    return (
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
      <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none space-y-5">
        <label htmlFor="input-field">New Price</label>
        <input id="input-field" className="text-black rounded-sm p-2" onChange={event => setNewPrice(event.target.value)}></input>
        <button className="bg-medici-purple p-3 rounded-2xl" onClick={() => onChangePrice()}>Submit</button>
      </div>
      </Modal>
    )
  case ("setClaimBlock"): 
    return (
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
      <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none space-y-5">
        <label htmlFor="input-field">Claim Block Start</label>
        { currClaimBlock && <h1>Current Claim Block: {currClaimBlock.toString()}</h1>}
        <input id="input-field" className="text-black rounded-sm p-2" onChange={event => setNewClaimBlock(event.target.value)}></input>
        <button className="bg-medici-purple p-3 rounded-2xl" onClick={() => onSetClaimBlock()}>Submit</button>
      </div>
      </Modal>
  )
  case ("setMintBlock"): 
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
    >
    <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none space-y-5">
      <label htmlFor="input-field">Mint Block Start</label>
      { currMintBlock && <h1>Current Mint Block: {currMintBlock.toString()}</h1>}
      <input id="input-field" className="text-black rounded-sm p-2" onChange={event => setNewMintBlock(event.target.value)}></input>
      <button className="bg-medici-purple p-3 rounded-2xl" onClick={() => onSetMintBlock()}>Submit</button>
    </div>
    </Modal>
  )
  case ("transferOwnership"): 
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock
    >
    <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none space-y-5">
      <label htmlFor="input-field">New Owner Address</label>
      <input id="input-field" className="text-black rounded-sm p-2" onChange={event => setNewOwnerAddress(event.target.value)}></input>
      <button className="bg-medici-purple p-3 rounded-2xl" onClick={() => onTransferOwnership()}>Submit</button>
    </div>
    </Modal>
  )
  case ("setMaxMintsPerPerson"):
    return (
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
      <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none space-y-5">
        <label htmlFor="input-field">Set Max Mints Per Person</label>
        <input id="input-field" className="text-black rounded-sm p-2" onChange={event => setNewMaxMintsPerPerson(event.target.value)}></input>
        <button className="bg-medici-purple p-3 rounded-2xl" onClick={() => onSetMaxMintsPerPerson()}>Submit</button>
      </div>
      </Modal>
    )
  default:
      return (
        <Modal
          open={showModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableScrollLock
        >
        <div className="relative top-[30%] mx-auto p-5 w-96 h-[300px] shadow-lg rounded-2xl bg-[#2e2c38] text-white flex flex-col items-center justify-center outline-none">
        
        </div>
        </Modal>
    )
  }
}

export default ProjectPopup
