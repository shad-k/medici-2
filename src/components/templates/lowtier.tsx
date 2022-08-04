import { BigNumber, ethers, utils } from 'ethers';
import React from 'react';
import FontPicker from 'font-picker-react';
import { BsTwitter } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { FaDiscord } from 'react-icons/fa';
import { Claim, Contract, Chain } from '../../model/types';
import useWallet from '../../hooks/useWallet';
import { API_ENDPOINT, API_PATHS, CONFIG } from '../../utils/config';
import { getContract, verifyMerkleProof } from '../../utils/web3';
import { getContractClaimStatus, getContractCover } from '../../utils/retrieve';
import { GET_CHAIN_BY_ID } from '../../model/chains';
import Countdown from './Countdown';
const localenv = CONFIG.DEV;

interface LowTierProps {
  claim: Claim;
  contractName?: string;
  isPreview: boolean;
}

const LowTier: React.FC<LowTierProps> = ({
  claim,
  contractName,
  isPreview,
}) => {
  const { wallet, connect, setChain } = useWallet();

  const connectedWallet = wallet?.accounts[0];

  const [name, setName] = React.useState<string>();
  const [contract, setContract] = React.useState<Contract>();
  const [masterAddress, setMasterAddress] = React.useState<string>();
  const [cover, setCover] = React.useState<string>();
  const [minting, setMinting] = React.useState<boolean>(false);
  const [txHash, setTxHash] = React.useState<string>();
  const [claiming, setClaiming] = React.useState<boolean>(false);
  const [claimTxHash, setClaimTxHash] = React.useState<string>();
  const [isVerified, setIsVerified] = React.useState<boolean>();
  const [verifiedProof, setVerifiedProof] = React.useState<string>();
  const [contractStatus, setContractStatus] = React.useState<string>();
  const [projectChain, setProjectChain] = React.useState<Chain>();

  const getContractStatus = React.useCallback(async () => {
    if (contract) {
      try {
        const { success, status } = await getContractClaimStatus(
          contract.name,
          contract.chainid
        );
        if (success) {
          setContractStatus(status);
          console.log('contract status ' + status);
        }
      } catch {
        alert('Could not get contract status');
      }
    }
  }, [contract]);

  const isAllowlistMember = React.useCallback(async () => {
    if (connectedWallet && contract) {
      try {
        const { success, merkleProof } = await verifyMerkleProof(
          contract.name,
          connectedWallet.address
        );
        setIsVerified(success);
        setVerifiedProof(merkleProof);
      } catch {
        setIsVerified(false);
      }
    }
  }, [connectedWallet, contract]);

  const getName = React.useCallback(async () => {
    if (claim && contract && projectChain) {
      const currContract = await getContract(claim.contract, projectChain);
      const collectionName = await currContract.name();
      setName(collectionName);
    }
  }, [claim, contract, projectChain]);

  const getContractOwner = React.useCallback(async () => {
    if (claim && contract && projectChain) {
      const currContract = await getContract(claim.contract, projectChain);
      const contractOwner = await currContract.masterAddress();
      setMasterAddress(contractOwner);
    }
  }, [claim, contract, projectChain]);

  const getCoverImage = React.useCallback(async () => {
    if (contractName) {
      const res = await getContractCover(contractName);
      setCover(res);
    }
  }, [contractName]);

  const mint = async () => {
    if (wallet && connectedWallet && projectChain) {
      setMinting(true);
      try {
        await setChain({ chainId: projectChain.hexId });
        const walletProvider = new ethers.providers.Web3Provider(
          wallet.provider
        );
        const signer = walletProvider.getSigner(connectedWallet?.address);
        const contract = new ethers.Contract(
          claim.contract,
          localenv.contract.instanceAbi,
          signer
        );
        const price = await contract.price();
        const tx = await contract.mint(connectedWallet?.address, 1, {
          value: price,
          gasLimit: 30000000,
        });
        const mintResponse = await tx.wait();
        console.log(mintResponse);
        setTxHash(mintResponse.transactionHash);
      } catch (error: any) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Something went wrong, please try again!');
        }
      } finally {
        setMinting(false);
      }
    }
  };

  const claimOnContract = async () => {
    if (
      wallet &&
      connectedWallet &&
      isVerified &&
      verifiedProof !== null &&
      projectChain
    ) {
      setClaiming(true);
      try {
        await setChain({ chainId: projectChain.hexId });
        const walletProvider = new ethers.providers.Web3Provider(
          wallet.provider
        );
        const signer = walletProvider.getSigner(connectedWallet?.address);
        const contract = new ethers.Contract(
          claim.contract,
          localenv.contract.instanceAbi,
          signer
        );
        const price = await contract.price();
        const tx = await contract.claim(
          connectedWallet?.address,
          1,
          verifiedProof,
          {
            value: price,
            gasLimit: 30000000,
          }
        );
        const claimResponse = await tx.wait();
        console.log(claimResponse);
        setClaimTxHash(claimResponse.transactionHash);
      } catch (error: any) {
        if (error.message) {
          alert(error.message);
        } else {
          alert('Something went wrong, please try again!');
        }
      } finally {
        setClaiming(false);
      }
    }
  };

  React.useEffect(() => {
    if (contractName && !name && !masterAddress && !cover) {
      getName();
      getContractOwner();
      getCoverImage();
    }
    if (contractName && !contractStatus) {
      isAllowlistMember();
      getContractStatus();
    }
    if (contract && !projectChain) {
      setProjectChain(GET_CHAIN_BY_ID(parseInt(contract.chainid)));
    }
  }, [
    getName,
    getContractOwner,
    getCoverImage,
    isAllowlistMember,
    getContractStatus,
    contractName,
    contract,
    cover,
    masterAddress,
    name,
    projectChain,
    setProjectChain,
  ]);

  React.useEffect(() => {
    (async () => {
      if (contractName) {
        const params = new URLSearchParams({
          collection: contractName,
        });
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const res = await fetch(
          `${API_ENDPOINT}${API_PATHS.GET_CONTRACT_BY_NAME}?` + params,
          {
            method: 'GET',
            headers,
          }
        )
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw new Error(res.statusText);
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
          } = res;
          setContract({
            name,
            symbol,
            masteraddress,
            contractaddress,
            txhash,
            chainid,
            claimsstart,
            mintstart,
          });
        }
      }
    })();
  }, [contractName]);

  // console.log(
  //   `linear-gradient(180deg, ${claim.primaryColor} 0%, ${claim.secondaryColor} 100%)`
  // )

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center text-white relative md:overflow-hidden px-0 md:px-8 apply-font">
      {/* Added so that the page is rendered using the font */}
      <div className="hidden">
        <FontPicker
          activeFontFamily={(claim.fontFamily as string) ?? undefined}
          apiKey={process.env.REACT_APP_GOOGLE_FONTS_API_KEY!}
        />
      </div>
      <div
        className="absolute z-0 min-h-full w-full left-0 top-0"
        style={{
          background: `linear-gradient(180deg, ${claim.primaryColor} 0%, ${claim.secondaryColor} 100%)`,
          filter: 'blur(200px)',
        }}
      />
      <div className="flex flex-col items-start relative z-1 w-full md:w-1/2 h-full py-20 px-2 md:px-12 scrollbar-hide md:overflow-auto">
        <h1 className="text-6xl mb-4 break-all">{name}</h1>
        <div className="flex items-center justify-between mb-12 w-full">
          <h6 className="uppercase text-xl">{claim.artist ?? ''}</h6>
          <div className="flex items-center space-x-2">
            {claim.discord && (
              <a
                href={claim.discord}
                target="_blank"
                rel="nofollow, noreferrer"
              >
                <FaDiscord size="20" />
              </a>
            )}
            {claim.email && (
              <a href={claim.email} target="_blank" rel="nofollow, noreferrer">
                <HiOutlineMail size="20" />
              </a>
            )}
            {claim.twitter && (
              <a
                href={claim.twitter}
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
            <tbody>
              <tr>
                <td>Contract Address</td>
                <td className="text-right text-white">
                  <a
                    className=""
                    href={`${localenv.network.addressEtherscanUrl}/address/${
                      claim!.contract
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {claim?.contract?.slice(0, 6)}...
                    {claim?.contract?.slice(-6)}
                  </a>
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
                {contract?.chainid === '5' ? (
                  <td className="text-right">Goerli</td>
                ) : (
                  <td className="text-right">Optimism</td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col justify-center relative z-1 w-full md:w-1/2 h-full p-8 pb-2 md:pb-8 bg-black/50">
        <img
          src={cover}
          alt=""
          className="h-[calc(100%-80px)] object-contain"
        />
        {contractStatus === 'claim' &&
          (isVerified ? (
            claimTxHash ? (
              <a
                className="px-5 py-2 rounded-2xl text-sm bg-emerald-800 text-white w-64 mx-auto text-center my-4"
                href={`${localenv.network.txEtherscanUrl}/tx/${claimTxHash}`}
                target="_blank"
                rel="noreferrer"
              >
                Success: Check transaction
              </a>
            ) : (
              <button
                className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500"
                onClick={
                  connectedWallet
                    ? () => claimOnContract()
                    : () =>
                        connect({
                          autoSelect: {
                            label: 'Wallet Connect',
                            disableModals: false,
                          },
                        })
                }
                disabled={claiming}
              >
                {' '}
                {connectedWallet
                  ? claiming
                    ? 'Claiming...'
                    : 'Claim Now'
                  : 'Connect Wallet'}
              </button>
            )
          ) : (
            <button className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500">
              Mint not active
            </button>
          ))}
        {contractStatus === 'mint' &&
          (txHash ? (
            <a
              className="px-5 py-2 rounded-2xl text-sm bg-emerald-800 text-white w-64 mx-auto text-center my-4"
              href={`${localenv.network.txEtherscanUrl}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              Success: Check transaction
            </a>
          ) : (
            <button
              className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500"
              onClick={
                connectedWallet
                  ? () => mint()
                  : () =>
                      connect({
                        autoSelect: {
                          label: 'Wallet Connect',
                          disableModals: false,
                        },
                      })
              }
              disabled={minting}
            >
              {' '}
              {connectedWallet
                ? minting
                  ? 'Minting...'
                  : 'Mint Now'
                : 'Connect Wallet'}
            </button>
          ))}
        {/* (txHash ? (
          <a
            className="px-5 py-2 rounded-2xl text-sm bg-emerald-800 text-white w-64 mx-auto text-center my-4"
            href={`${localenv.network.txEtherscanUrl}${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Success: Check transaction
          </a>
        ) : (
          <button
            className="px-5 py-2 rounded-2xl text-sm bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500"
            onClick={connectedWallet ? () => mint() : () => connect({})}
            disabled={minting}
          >
            {connectedWallet
              ? minting
                ? 'Minting...'
                : 'Mint Now'
              : 'Connect Wallet'}
          </button>
        ))
        } */}
        {contract &&
          contractStatus === 'none' &&
          (isVerified ? (
            <div className="inline-flex gap-1">
              <Countdown countdownBlock={contract?.claimsstart} /> until claim
              starts
            </div>
          ) : (
            <div className="inline-flex gap-1">
              <Countdown countdownBlock={contract?.mintstart} /> until mint
              starts
            </div>
          ))}
        {contract &&
          contractStatus &&
          (contractStatus === 'claim' || contractStatus === 'none') && (
            <div className="inline-flex gap-1">
              <Countdown countdownBlock={contract?.mintstart} /> until mint
              starts
            </div>
          )}
        {/* { (!(isPreview) && contract) && <div className="inline-flex gap-1"><Countdown countdownBlock={contract?.mintstart}/> until mint </div> } */}

        <div className="text-right text-sm text-white flex justify-end mt-4 md:mt-0">
          <a target="_blank" rel="noreferrer" href="/">
            <div className="flex w-fit">
              powered by{' '}
              <img
                src="/logo.png"
                alt="Medici logo"
                width={20}
                className="mx-1"
              />
              Medici
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LowTier;
