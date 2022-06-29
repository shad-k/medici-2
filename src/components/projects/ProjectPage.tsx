import React, { useState, useCallback, useEffect } from 'react'
import { getContractCover } from '../../utils/retrieve'
import { getThumbnails } from '../../utils/reservations'
import { getContract } from '../../utils/web3'
import useWallet from '../../hooks/useWallet'
import { BigNumber, utils } from 'ethers'

const ProjectPage: React.FC<{ contractAddress: string }> = ({contractAddress}) => {
  const { wallet, connect } = useWallet()
  const connectedWallet = wallet?.accounts[0]
  const [name, setName] = useState<string>()
  const [symbol, setSymbol] = useState<string>()
  const [balance, setBalance] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [cover, setCover] = useState<string>()
  const [thumbnails, setThumbnails] = useState<string[]>()
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const [withdrawing, setWithdrawing] = useState<boolean>(false)
  const [withdrawalResponse, setWithdrawalResponse] = useState<string>()

  const verify = useCallback(async () => {
    if (wallet) {
      const contract = await getContract(wallet, contractAddress)
      const collectionOwner = await contract.masterAddress()
      if (collectionOwner === utils.getAddress(connectedWallet!.address as string)) {
        setIsOwner(true)
      } else {
        setIsOwner(false)
      }
    } else {
      setIsOwner(false)
    }
  }, [wallet, contractAddress, isOwner])

  const getName = useCallback(async () => {
    const contract = await getContract(wallet, contractAddress)
    const collectionName = await contract.name()
    const collectionSymbol = await contract.symbol()
    setName(collectionName)
    setSymbol(collectionSymbol)
  }, [wallet, contractAddress])

  const getCoverImage = useCallback(async () => {
    if (name) {
      const res = await getContractCover(name);
      setCover(res);
    }
  }, [name])

  const getCollectionThumbnails = useCallback(async () => {
    if (name) {
      const res = await getThumbnails(name);
      setThumbnails(res);
    }
  }, [name])

  const getContractDetails = useCallback(async () => {
    const contract = await getContract(wallet, contractAddress)
    const balance = await contract.checkBalance()
    console.log(balance._hex)
    setBalance(utils.formatEther(balance._hex.toString()))
    console.log(utils.parseUnits("1.0", "wei"));
    const price = await contract.price();
    const p = utils.formatUnits(price._hex, "ether");
    setPrice(p)
  }, [wallet, contractAddress])

  const onWithdraw = async () => {
    setWithdrawing(true)
    try {
      const contract = await getContract(wallet, contractAddress)
      const tx = await contract.withdraw();
      const withdrawResponse = await tx.wait()
      console.log(withdrawResponse);
      setWithdrawalResponse(withdrawResponse)
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

  useEffect(() => {
    verify()
    if (!name && wallet && isOwner) getName()
    if (!cover && wallet && isOwner) getCoverImage()
    if (isOwner && wallet) getContractDetails()
    if (!thumbnails) getCollectionThumbnails()
  }, [name, cover, wallet, isOwner])

  return (
  <div>
  { isOwner ? (
    <div className="flex flex-col items-center">
      <div className="drop-shadow-lg items-center flex flex-col max-h-96">   
        <div className="relative aspect-video object-cover overflow-hidden">
          <img src={cover} className="w-full aspect-video object-cover"/>
        </div>
        <div className="absolute h-full left-0 top-0 aspect-video w-full bg-gradient-to-b from-transparent to-black/80 drop-shadow-md"></div>
      </div>
      <div className="p-10 space-y-10 flex flex-col w-full">
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-[0.5px] lg:gap-3 bg-[#121216] lg:bg-transparent rounded-3xl overflow-hidden lg:overflow-visible drop-shadow-lg lg:drop-shadow-none">
          <div className="p-5 lg:rounded-2xl bg-[#201F27] lg:drop-shadow-lg text-center transition lg:hover:-translate-y-1 ease-in">
            <h1 className="block text-2xl">Earnings</h1>
            {balance && <p className="text-lg">{balance} ETH</p>} 
          </div>
          <div className="p-5 lg:rounded-2xl bg-[#201F27] lg:drop-shadow-lg text-center transition lg:hover:-translate-y-1 ease-in">
          <h1 className="block text-2xl">Price</h1>
          { price && <p className="text-lg">{price} ETH</p> }
          </div>
          <div className="p-5 lg:rounded-2xl bg-[#201F27] lg:drop-shadow-lg text-center transition lg:hover:-translate-y-1 ease-in">
            <h1 className="block text-2xl">Address</h1>
            <p className="text-lg overflow-hidden overflow-ellipsis block w-full">{contractAddress}</p>
          </div>
          <div className="p-5 lg:rounded-2xl bg-[#201F27] lg:drop-shadow-lg text-center transition lg:hover:-translate-y-1 ease-in">
            <h1 className="block text-2xl">Owner</h1>
            <p className="text-lg overflow-hidden overflow-ellipsis block w-full">{connectedWallet!.address}</p>
          </div>
        </div>
        <h1 className="text-5xl text-left tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-violet-500 to-fuchsia-500">{name} ({symbol}) </h1>
        { withdrawing ? <button className="bg-medici-purple rounded-2xl p-3 mt-24">Withdrawing</button> : <button className="bg-medici-purple rounded-2xl p-3" onClick={onWithdraw}>Withdraw</button> }
      </div>
    </div>
  ) : ( <p>Not your page</p> )
  }
  </div>
  );
}

export default ProjectPage