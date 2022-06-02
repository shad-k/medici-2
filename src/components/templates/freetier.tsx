import { ethers } from 'ethers'
import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { FaDiscord } from 'react-icons/fa'
import { Claim } from '../../model/types'
import useWallet from '../../hooks/useWallet'
import { API_ENDPOINT, API_PATHS } from '../../utils/config'

interface FreeTierProps {
  claim: Claim
  contractName: string
}
const abi = [
  'function tokenURI(uint256 tokenId) public view returns (string memory)',
  'function name() public view returns (string memory)',
  'function masterAddress() public view returns (string memory)',
  'function mint(address account,uint256 numOfTokensToMint) external payable',
]
// const provider = new ethers.providers.JsonRpcProvider(
//   'https://opt-mainnet.g.alchemy.com/v2/aZAch5n6Co6vvepI37ogK-QLiCmofL04'
// )
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-kovan.alchemyapi.io/v2/Nhwt0isGKmoL-652jwR15xcJgvUy59CD'
)

const FreeTier: React.FC<FreeTierProps> = ({ claim, contractName }) => {
  const { wallet, connect } = useWallet()

  const connectedWallet = wallet?.accounts[0]

  const [name, setName] = React.useState<string>()
  const [masterAddress, setMasterAddress] = React.useState<string>()
  const [cover, setCover] = React.useState()

  const getName = React.useCallback(async () => {
    const contract = new ethers.Contract(claim.contract, abi, provider)
    const collectionName = await contract.name()
    setName(collectionName)
  }, [claim])

  const getContractOwner = React.useCallback(async () => {
    const contract = new ethers.Contract(claim.contract, abi, provider)
    const contractOwner = await contract.masterAddress()
    setMasterAddress(contractOwner)
  }, [claim])

  const getCoverImage = React.useCallback(async () => {
    const res = await fetch(`${API_ENDPOINT}${API_PATHS.CLAIM_COVER}`, {
      method: 'POST',
      body: JSON.stringify({
        contractName,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error(res.statusText)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    if (res) {
      setCover(res.data)
    }
  }, [contractName])

  const mint = async () => {
    console.log('mint')
    if (wallet && connectedWallet) {
      try {
        const walletProvider = new ethers.providers.Web3Provider(
          wallet.provider
        )
        const signer = walletProvider.getSigner(connectedWallet?.address)
        const contract = new ethers.Contract(claim.contract, abi, signer)
        const tx = await contract.mint(connectedWallet?.address, 1, {
          gasLimit: 30000000,
        })
        const mintResponse = await tx.wait()
        console.log(mintResponse)
      } catch (error) {
        console.log(error)
      }
    }
  }

  React.useEffect(() => {
    getName()
    getContractOwner()
    getCoverImage()
  }, [getName, getContractOwner, getCoverImage])

  return (
    <div className="w-full min-h-[100vh] -mt-16 flex flex-col md:flex-row items-center justify-center text-white relative md:overflow-hidden px-0 md:px-8">
      <div
        className="absolute z-0 min-h-full w-full left-0 top-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(36, 0, 255, 0.6) 0%, rgba(0, 255, 209, 0.6) 100%)',
          filter: 'blur(200px)',
        }}
      />
      <div className="flex flex-col items-start relative z-1 w-full md:w-1/2 h-full py-20 px-2 md:px-12 scrollbar-hide md:overflow-auto">
        <h1 className="text-6xl mb-4 break-all">{name}</h1>
        <div className="flex items-center justify-between mb-12 w-full">
          <h6 className="uppercase text-xl">{claim.artist ?? ''}</h6>
          <div className="flex items-center space-x-2">
            {claim.collection_discord && (
              <a
                href={claim.collection_discord}
                target="_blank"
                rel="nofollow, noreferrer"
              >
                <FaDiscord size="20" />
              </a>
            )}
            {claim.collection_email && (
              <a
                href={claim.collection_email}
                target="_blank"
                rel="nofollow, noreferrer"
              >
                <HiOutlineMail size="20" />
              </a>
            )}
            {claim.collection_twitter && (
              <a
                href={claim.collection_twitter}
                target="_blank"
                rel="nofollow, noreferrer"
              >
                <BsTwitter size="20" />
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mb-12">
          {claim.description}
        </div>
        <div className="flex flex-col justify-between leading-10 text-white/60 w-full">
          <h5 className="text-xl text-white mb-2">Details</h5>
          <table className="w-full">
            <tr>
              <td>Contract Address</td>
              <td className="text-right text-white">
                {claim.contract.slice(0, 6)}...{claim.contract.slice(-6)}
              </td>
            </tr>
            <tr>
              <td>Contract Type</td>
              <td className="text-right">ERC-721</td>
            </tr>
            {masterAddress && (
              <tr>
                <td>Contract Owner</td>
                <td className="text-right text-white">
                  {masterAddress.slice(0, 6)}...{masterAddress.slice(-6)}
                </td>
              </tr>
            )}
            <tr>
              <td>Blockchain</td>
              <td className="text-right">Optimism</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="flex flex-col justify-center relative z-1 w-full md:w-1/2 h-[100vh] p-8 pb-2 md:pb-8 bg-black/50">
        <img
          src={cover}
          alt=""
          className="h-[calc(100%-50px)] object-contain"
        />
        <button
          className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white w-40 mx-auto mt-4"
          onClick={connectedWallet ? () => mint() : () => connect({})}
        >
          {connectedWallet ? 'Mint Now' : 'Connect Wallet'}
        </button>
        <div className="text-right text-sm text-white flex justify-end mt-4 md:mt-0">
          powered by{' '}
          <img src="/logo.png" alt="Medici logo" width={20} className="mx-1" />
          Medici
        </div>
      </div>
    </div>
  )
}

export default FreeTier
