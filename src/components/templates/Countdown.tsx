import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import useWallet from '../../hooks/useWallet'


const Countdown: React.FC<{ countdownBlock: number }> = ({ countdownBlock }) => {
    const { wallet } = useWallet()
    const [blockDifference, setBlockDifference] = useState<number>()
  
    const getBlocksRemaining = async () => {
      if (wallet) {
        const walletProvider = new ethers.providers.Web3Provider(wallet.provider)
        const latestBlock = await walletProvider.getBlockNumber()
        // console.log("orig block: " + countdownBlock + " -  curr block: " + latestBlock + " = " + (countdownBlock - latestBlock))
        setBlockDifference(countdownBlock - latestBlock);
      }
    }

    useEffect(() => {
      setInterval(() => {
        getBlocksRemaining()
      }, 2000)
    }, [blockDifference, setBlockDifference])
    // if (blockDifference! <= 0) return null 

    return (
      <div>
        {blockDifference} blocks
      </div>
  );
}
export default Countdown