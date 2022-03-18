import { utils } from 'ethers'
import React from 'react'
import { HiOutlineCreditCard } from 'react-icons/hi'
import useWallet from '../hooks/useWallet'
import { Collection, Token } from '../types'
import NFTImage from './NFTImage'
import EthIcon from './svgComponents/EthIcon'

interface IBuyConfirmationModalProps {
  closeModal: () => void
  nft: Token
  collection?: Collection
}

const BuyConfirmationModal: React.FC<IBuyConfirmationModalProps> = ({
  closeModal,
  nft,
  collection,
}) => {
  const { wallet, connect } = useWallet()

  const floor_price = 0
  const connectedWallet = wallet?.accounts[0]

  return (
    <div className="fixed bg-black/80 h-full w-full left-0 top-0 z-20 flex items-center justify-center">
      <div className="bg-white min-w-[300px] md:min-w-[400px] shadow-md rounded-xl text-black">
        <div className="flex items-center justify-center border-b border-gray-200 px-4 py-3 relative">
          <span className="text-center flex-1 font-semibold">Edition</span>
          <button
            className="text-2xl ml-4 absolute right-4"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        <div className="flex items-center justify-center flex-col py-4 px-6">
          <div className="w-32">
            <NFTImage nft={nft} collection={collection} />
          </div>
          <h2 className="mt-3 text-2xl font-bold">
            {collection?.name} #{nft.tokenID}
          </h2>

          {!connectedWallet ? (
            <button
              className="rounded-t-xl bg-gray-100 p-2 flex items-center w-full mt-6 mb-0.5 bg-green-500"
              onClick={() => connect({})}
            >
              <span className="flex-1 text-left">Connect Wallet</span>{' '}
              <HiOutlineCreditCard size="20" />
            </button>
          ) : (
            <div className="rounded-t-xl bg-gray-100 p-2 flex items-center w-full mt-6 mb-0.5">
              <span className="flex-1">
                {connectedWallet?.ens?.name ??
                  `${connectedWallet?.address.slice(
                    0,
                    6
                  )}...${connectedWallet?.address.slice(-6)}`}
              </span>{' '}
              <HiOutlineCreditCard size="20" />
            </div>
          )}
          <div className="rounded-b-xl bg-gray-100 p-2 flex items-center w-full">
            <span className="flex-1">
              {utils.formatUnits(floor_price, 'gwei')} ETH
            </span>
            <EthIcon />
          </div>

          <button
            className="mx-auto w-full py-3 rounded-xl bg-green-500 text-white mt-4 text-sm disabled:bg-green-500/50 disabled:cursor-not-allowed"
            disabled={!connectedWallet}
          >
            Collect 1 NFT
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyConfirmationModal
