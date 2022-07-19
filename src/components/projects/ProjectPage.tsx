import React, { useState, useCallback, useEffect } from 'react'
import { getContractCover, getContractClaimStatus } from '../../utils/retrieve'
import { getThumbnails, getPreviews } from '../../utils/reservations'
import { getContract, getContractForTransactions } from '../../utils/web3'
import useWallet from '../../hooks/useWallet'
import ProjectPopup from './ProjectPopup'
import { Card, CardMedia } from '@mui/material'
import { utils } from 'ethers'
import { API_ENDPOINT, API_PATHS } from '../../utils/config'
import { Contract, Chain } from '../../model/types'
import { GET_CHAIN_BY_ID } from '../../model/chains'
import { HiLink } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ProjectPage: React.FC<{ contractName: string }> = ({contractName}) => {
  const { wallet } = useWallet()
  const connectedWallet = wallet?.accounts[0]
  const [contract, setContract] = useState<Contract>()
  
  const [balance, setBalance] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [cover, setCover] = useState<string>()
  const [contractStatus, setContractStatus] = useState<string>()
  const [projectChain, setProjectChain] = useState<Chain>()
  const [numMinted, setNumMinted] = useState<number>()
  const [maxSupply, setMaxSupply] = useState<number>()
  const [thumbnails, setThumbnails] = useState<Array<string>>()
  const [previews, setPreviews] = useState<Array<string>>()
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
    try {
      if (contract) {
        const res = await getThumbnails(contract.name);
        if (res === '') {
        const musicres = await getPreviews(contract.name);
        setPreviews(musicres)
        }
        setThumbnails(res);
      }
    } catch (error: any) {
     console.log(error.message)
    } 
  }, [contract])

  const getContractDetails = useCallback(async () => {
    if (contract && projectChain) {
      const currContract = await getContract(contract.contractaddress, projectChain)
      const balance = await currContract.checkBalance()
      setBalance(utils.formatEther(balance._hex.toString()))
      const price = await currContract.price()
      setPrice(utils.formatEther(price._hex));
      const numMinted = await currContract.totalSupply()
      setNumMinted(numMinted.toString())
      const maxSupply = await currContract.maxSupply()
      setMaxSupply(maxSupply.toString())
    }
  }, [contract, projectChain])

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
  
}, [contract, contractName, setContract])

useEffect(() => {
  if (contract) {
    verify()
    if (!cover) getCoverImage()
    if (!contractStatus) getContractStatus()
    if (!price && !numMinted && !maxSupply && !balance && projectChain) getContractDetails()
    if (!projectChain && contract) {
      setProjectChain(GET_CHAIN_BY_ID(parseInt(contract.chainid)))
    } 
    if (!thumbnails && !previews) getCollectionThumbnails()
  }
}, [
  contract, verify, isOwner, setIsOwner,
  cover,setCover,getCoverImage,
  numMinted, maxSupply, balance, price, getContractDetails,
  previews, thumbnails, getCollectionThumbnails,
  contractStatus, getContractStatus,
  projectChain, setProjectChain
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

  useEffect(() => {
    var lazyImages = [].slice.call(
      document.querySelectorAll('.lazy-loaded-image.lazy')
    );

    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target as HTMLMediaElement;
          if (lazyImage) {
            lazyImage.src = lazyImage.dataset.src!;
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  });

  return (
  <div>
  { isOwner ? (
    <div className="flex flex-col items-center -mt-16">
      <div className="relative w-full items-center">
        <div className="absolute top-48 left-[20%] lg:left-36 inline-flex z-10 md:gap-2">
          <h1 className="z-10 text-3xl lg:text-6xl">{contractName} ({contract!.symbol})</h1>
          <a 
            target="_blank"
            rel="noreferrer"
            href={`/page/${contractName}`}>
          <HiLink size={40}/></a>
        </div>
        <div className="overflow-hidden drop-shadow-lg items-center flex w-full max-h-96">   
          <div className="relative w-full aspect-video object-cover overflow-hidden z-0">
            <img src={cover} className="block w-full aspect-video object-cover"/>
          </div>
          <div className="absolute h-full left-0 top-0 aspect-video w-full bg-gradient-to-b from-transparent to-black/80 drop-shadow-md"></div>
        </div>
        <div className="md:absolute top-72 grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-[0.5px] overflow-hidden">
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Balance</h1>
            {balance && <p className="text-lg">{balance} ETH</p>} 
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
          <h1 className="block text-2xl">Minted</h1>
          { (numMinted && maxSupply) && <p className="text-lg">{numMinted} / {maxSupply} </p> }
          </div>
          <a href={`${projectChain?.etherscanUrl}/address/${contract?.contractaddress}`}
            target="_blank"
            rel="noreferrer"
          >
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Address</h1>
            <p className="text-lg overflow-hidden overflow-ellipsis block w-full">{contract?.contractaddress}</p>
          </div>
          </a>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Chain</h1>
            { projectChain?.label }
          </div>
        </div>
        <span className="absolute top-0 right-5 bg-white text-black p-3 rounded-2xl -translate-y-64">Currently: {contractStatus} period</span>
      </div>
      <div className="mt-7 left-0 justify-start w-11/12">
      <Link
        to={`/projects`}>
        <MdArrowBack size={40}/>
      </Link>
      </div>
        <div className="flex flex-col md:grid grid-cols-4 grid-rows-2 auto-rows-max justify-center items-center gap-7 p-3 w-4/5">
        { withdrawalTxHash ? 
            ( <a className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection text-xl"
              href={`${projectChain?.etherscanUrl}/tx/${withdrawalTxHash}`}
              target="_blank"
              rel="noreferrer">
              Success: Check transaction
              </a> ) : 
              (<button
                className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection text-xl"
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
            <h1 className="text-xl">Change Base URI</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("setClaimBlock"); handleOpen()}}>
            <h1 className="text-xl">Set Claim Block</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("setMintBlock"); handleOpen()}}>
            <h1 className="text-xl">Set Mint Block</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("changePrice"); handleOpen()}}>
            <h1 className="text-xl">Set Price</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("transferOwnership"); handleOpen()}}>
            <h1 className="text-xl">Transfer Ownership</h1>
          </button>
          <button
            className="w-full items-center text-center px-4 py-4 rounded-2xl text-medici-primary transition duration-100 hover:scale-105 bg-zinc-400/5 backdrop-blur-sm hover:backdrop-blur-lg border-white border-[1px] space-y-3 h-full hero-collection"
            onClick={() => { setCurrAction("setMaxMintsPerPerson"); handleOpen()}}>
            <h1 className="text-xl">Set Max # Mints Per Person</h1>
          </button>
        </div>
        { thumbnails &&
        <div className="text-center w-3/5 mt-10">
          <h1 className="text-3xl m-2">Collection Assets</h1>
          <h2>The images shown are image previews. Previews may appear blurry, cropped or distorted.</h2>
        </div>
        }
        <div className="grid md:grid-cols-3 m-10 w-4/5 lg:w-9/12 auto-rows-max">
        {contract && thumbnails && 
          (Object.keys(thumbnails).map((i: string) => (
            // <NFTCard collection={contractName} index={i} onSelect={handleSelectNFT}/>)
            <div className="p-2" key={`${contract.name}-${i}`}>
              {/* <img className="lazy-loaded-image lazy" src="https://placeholder.pics/svg/300" data-src={process.env.PUBLIC_URL + `/assets/${contractName}/${i}.png`} alt={`${i}`} onClick={event => handleSelectNFT(i)}/> */}
              <Card>
                <CardMedia
                key={`${contract.name}-${i}`}
                data-src="https://placeholder.pics/svg/120x150"
                component="img"
                alt={`${i}`}
                image={thumbnails[parseInt(i)]}
                title={`${contract.name}-${i}`}
                sx={{ height: 300 }}
                />
              </Card>
            </div>
          )))
        } 
        </div>
        <div id="modal-container" className="hidden items-center justify-center text-center h-screen">
          {contract && action && projectChain && 
            <ProjectPopup showModal={showModal} handleClose={handleClose} contract={contract} chain={projectChain} action={action}/>
          }
        </div>
      </div>
  ) : ( <p>Not your page</p> )
  }
  </div>
  );
}

export default ProjectPage