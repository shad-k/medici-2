import React, { useState, useCallback, useEffect } from 'react'
import { getContractCover, getContractClaimStatus } from '../../utils/retrieve'
import { getThumbnails } from '../../utils/reservations'
import { getContract, getContractForTransactions } from '../../utils/web3'
import useWallet from '../../hooks/useWallet'
import ProjectPopup from './ProjectPopup'
import { BigNumber, utils } from 'ethers'
import { API_ENDPOINT, API_PATHS, CONFIG } from '../../utils/config'
import { Contract } from '../../model/types'

const ProjectPage: React.FC<{ contractName: string }> = ({contractName}) => {
  const { wallet, connect } = useWallet()
  const connectedWallet = wallet?.accounts[0]
  const [contract, setContract] = useState<Contract>()
  
  const [balance, setBalance] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [cover, setCover] = useState<string>()
  const [contractStatus, setContractStatus] = useState<string>()
  const [numMinted, setNumMinted] = useState<number>()
  const [maxSupply, setMaxSupply] = useState<number>()
  const [thumbnails, setThumbnails] = useState<Array<string>>()
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [action, setCurrAction] = useState<any>()

  const [withdrawing, setWithdrawing] = useState<boolean>(false)
  const [withdrawalTxHash, setWithdrawalTxHash] = useState<string>()
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

 /* ---------------------------------- Other --------------------------------- */

  const verify = useCallback(async () => {
    if (contract && connectedWallet) {
      if (contract.masteraddress === utils.getAddress(connectedWallet!.address as string)) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    } else {
      setIsOwner(false)
    }
  }, [connectedWallet, contract])

  const getContractStatus = React.useCallback(async () => {
    if (contract) {
      try {
        const { success, status } = await getContractClaimStatus(contract.name, contract.chainid)
        if (success) {
          console.log("Status " + status)
          setContractStatus(status)
        }
      } catch {
        alert("Could not get contract status")
      }
    }
  }, [contract])

  /* ---------------------------- Contract Getters ---------------------------- */

  const getCoverImage = useCallback(async () => {
    if (contractName) {
      const res = await getContractCover(contractName);
      setCover(res);
    }
  }, [contractName])

  const getCollectionThumbnails = useCallback(async () => {
    if (contract) {
      const res = await getThumbnails(contract.name);
      setThumbnails(res);
    }
  }, [contract])

  const getContractDetails = useCallback(async () => {
    if (contract) {
      const currContract = await getContract(contract.contractaddress, contract.chainid)
      const balance = await currContract.checkBalance()
      setBalance(utils.formatEther(balance._hex.toString()))
      const price = await currContract.price();
      setPrice(utils.formatEther(price._hex));
      const numMinted = await currContract.totalSupply()
      setNumMinted(numMinted.toString())
      const maxSupply = await currContract.maxSupply()
      setMaxSupply(maxSupply.toString())
    }
  }, [wallet, contract])

  /* -------------------------- Contract interactions ------------------------- */

  const onWithdraw = async () => {
    setWithdrawing(true)
    if (contract) {
      try {
        const signedContract = await getContractForTransactions(wallet, contract.contractaddress)
        const tx = await signedContract.withdraw()
        const withdrawResponse = await tx.wait()
        console.log(withdrawResponse.transactionHash);
        setWithdrawalTxHash(withdrawResponse)
        console.log(withdrawalTxHash)
      } catch (error: any) {
        if (error.message) {
          alert(error.message)
        } else {
          alert("Something went wrong!")
        } 
      } finally {
        setWithdrawing(false)
      }
    }
  }

  /* --------------------------------- Effects -------------------------------- */

  useEffect(() => {
    ;(async () => {
    if (!contract) {
    if (contractName) {
    const params = new URLSearchParams({
      collection: contractName
    })
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const res = await fetch(`${API_ENDPOINT}${API_PATHS.GET_CONTRACT_BY_NAME}?` + params, {
      method: 'GET',
      headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    }).catch((error) => {
      console.log(error)
    })
    if (res !== undefined) {
      const {
        name,
        symbol,
        masteraddress,
        contractaddress,
        txhash,
        chainid,
        claimsstart,
        mintstart,
      } = res
      setContract({
        name,
        symbol,
        masteraddress,
        contractaddress,
        txhash,
        chainid,
        claimsstart,
        mintstart
      })
    }
    }
  }
  })()
  
}, [contract, setContract])

useEffect(() => {
  if (contract) {
    verify()
    if (!cover) getCoverImage()
    if (!contractStatus) getContractStatus()
    if (!price && !numMinted && !maxSupply && !balance) getContractDetails()
    // if (!thumbnails) {getCollectionThumbnails()} else {
    //   console.log(thumbnails[1])
    // }
  }
}, [
  contract, verify, isOwner, setIsOwner,
  cover,setCover,getCoverImage,
  numMinted, maxSupply, balance, price, getContractDetails,
  thumbnails, getCollectionThumbnails,
  contractStatus, getContractStatus,
  ])

  useEffect(() => {
    if (showModal && document.getElementById("modal-container") !== null) {
      document.getElementById("modal-container")!.style.display = 'relative'
    } else if (!showModal && document.getElementById("modal-container") !== null){
      document.getElementById("modal-container")!.style.display = 'none'
    } else {
      return;
    }
  },[showModal])

  return (
  <div>
  { isOwner ? (
    <div className="flex flex-col items-center -mt-16">
      <div className="overflow-hidden drop-shadow-lg items-center flex w-full">   
        <div className="relative w-full aspect-video object-cover overflow-hidden max-h-96">
          <img src={cover} className="block w-full aspect-video object-cover"/>
        </div>
        <div className="absolute h-full left-0 top-0 aspect-video w-full bg-gradient-to-b from-transparent to-black/80 drop-shadow-md"></div>
      </div>
        <span className="bg-white text-black p-3 rounded-2xl -translate-y-64">Currently: {contractStatus} period</span>
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-[0.5px] rounded-3xl overflow-hidden -translate-y-52 w-4/5">
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Balance</h1>
            {balance && <p className="text-lg">{balance} ETH</p>} 
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
          <h1 className="block text-2xl">Minted</h1>
          { (numMinted && maxSupply) && <p className="text-lg">{numMinted} / {maxSupply} </p> }
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Address</h1>
            <p className="text-lg overflow-hidden overflow-ellipsis block w-full">{contract?.contractaddress}</p>
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Chain</h1>
            { (contract?.chainid === '5') ? <p>Goerli</p> : <p>Optimism</p> }
          </div>
        </div>
        <h1 className="text-5xl -mt-16">{contractName} ({contract!.symbol})</h1>
        <p></p>
        <div className="flex flex-col md:grid grid-cols-2 grid-rows-2 auto-rows-max justify-center items-center gap-7 p-5 w-4/5 lg:w-3/5 mt-10">
        { withdrawalTxHash ? 
            ( <a className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection text-2xl"
              href={`https://goerli.etherscan.io/tx/${withdrawalTxHash}`}
              target="_blank"
              rel="noreferrer">
              Success: Check transaction
              </a> ) : 
              (<button
                className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection text-2xl"
                onClick={() => onWithdraw()}
                disabled={withdrawing}
              >{withdrawing ?
                'Withdrawing...'
                : 'Withdraw'}
              </button>)
          }
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("changeBaseURI"); handleOpen()}}>
            <h1 className="text-2xl">Change Base URI</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("setClaimBlock"); handleOpen()}}>
            <h1 className="text-2xl">Set Claim Block</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("setMintBlock"); handleOpen()}}>
            <h1 className="text-2xl">Set Mint Block</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("changePrice"); handleOpen()}}>
            <h1 className="text-2xl">Change Price</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("transferOwnership"); handleOpen()}}>
            <h1 className="text-2xl">Transfer Ownership</h1>
          </button>
        </div>
        {/* { thumbnails && <p className="text-6xl">{thumbnails.length}</p>} */}
        <div id="modal-container" className="hidden items-center justify-center text-center h-screen">
          {contract && action &&
            <ProjectPopup showModal={showModal} handleClose={handleClose} contract={contract} action={action}/>
          }
        </div>
      </div>
  ) : ( <p>Not your page</p> )
  }
  </div>
  );
}

export default ProjectPage