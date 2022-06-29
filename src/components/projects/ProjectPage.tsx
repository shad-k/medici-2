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
    <div className="flex flex-col items-center -mt-16">
      <div className="overflow-hidden drop-shadow-lg items-center flex w-full">   
        <div className="relative w-full aspect-video object-cover overflow-hidden max-h-96">
          <img src={cover} className="block w-full aspect-video object-cover"/>
        </div>
        <div className="absolute h-full left-0 top-0 aspect-video w-full bg-gradient-to-b from-transparent to-black/80 drop-shadow-md"></div>
      </div>
        <div className="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 gap-[0.5px] rounded-3xl overflow-hidden -translate-y-52 w-4/5">
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm hover:bg-zinc-50/20 hover:backdrop-blur-lg transition ease-in text-center">
            <h1 className="block text-2xl">Earnings</h1>
            {balance && <p className="text-lg">{balance} ETH</p>} 
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm text-center">
          <h1 className="block text-2xl">Price</h1>
          { price && <p className="text-lg">{price} ETH</p> }
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm text-center">
            <h1 className="block text-2xl">Address</h1>
            <p className="text-lg overflow-hidden overflow-ellipsis block w-full">{contractAddress}</p>
          </div>
          <div className="p-5 bg-zinc-400/20 backdrop-blur-sm text-center">
            <h1 className="block text-2xl">Owner</h1>
            <p className="text-lg overflow-hidden overflow-ellipsis block w-full">{connectedWallet!.address}</p>
          </div>
        </div>
        <h1 className="text-6xl -mt-16">{name}</h1>
        <div className="flex flex-col md:grid grid-cols-3 gap-3 w-full p-10 h-[500px]">
          <button className="bg-zinc-800 drop-shadow-sm rounded-2xl">Withdraw</button>
          <button className="bg-zinc-800 drop-shadow-sm rounded-2xl">Withdraw</button>
          <button className="bg-zinc-800 drop-shadow-sm rounded-2xl">Withdraw</button>
        </div>
      </div>
  ) : ( <p>Not your page</p> )
  }
  </div>
  );
}

export default ProjectPage