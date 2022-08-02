import { ethers } from 'ethers';
import React from 'react';
import FontPicker from 'font-picker-react';
import { BsTwitter } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { FaDiscord } from 'react-icons/fa';
import { Chain, Claim, Contract } from '../../model/types';
import useWallet from '../../hooks/useWallet';
import { getThumbnails } from '../../utils/reservations';
import { API_ENDPOINT, API_PATHS, CONFIG } from '../../utils/config';
import { getContract, verifyMerkleProof } from '../../utils/web3';
import { getContractClaimStatus, getContractCover } from '../../utils/retrieve';
import { GET_CHAIN_BY_ID } from '../../model/chains';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const localenv = CONFIG.DEV;

interface FreeTierProps {
  claim: Claim;
  contractName?: string;
  isPreview: boolean;
}

const FreeTier: React.FC<FreeTierProps> = ({
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
  const [thumbnails, setThumbnails] = React.useState<string[]>();
  const [minting, setMinting] = React.useState<boolean>(false);
  const [txHash, setTxHash] = React.useState<string>();
  const [claiming, setClaiming] = React.useState<boolean>(false);
  const [claimTxHash, setClaimTxHash] = React.useState<string>();
  const [isVerified, setIsVerified] = React.useState<boolean>();
  const [verifiedProof, setVerifiedProof] = React.useState<string>();
  const [contractStatus, setContractStatus] = React.useState<string>();
  const [projectChain, setProjectChain] = React.useState<Chain>();

  const stackSettings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getContractStatus = React.useCallback(async () => {
    if (contract && projectChain) {
      try {
        const { success, status } = await getContractClaimStatus(
          contract.name,
          projectChain.id.toString()
        );
        if (success) {
          setContractStatus(status);
        }
      } catch {
        alert('Could not get contract status');
      }
    }
  }, [contract, projectChain]);

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

  const getCollectionThumbnails = React.useCallback(async () => {
    try {
      if (contractName) {
        const res = await getThumbnails(contractName);
        setThumbnails(res);
      }
    } catch (error: any) {
      console.log(error.message);
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
          gasLimit: 9000000,
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
            gasLimit: 9000000,
          }
        );
        const claimResponse = await tx.wait();
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
    if (contractName && !name && !masterAddress && !cover && !contractStatus) {
      getName();
      getContractOwner();
      getCoverImage();
    }
    if (contractName && !isPreview) {
      isAllowlistMember();
    }
    if (contract && !contractStatus) {
      getContractStatus();
    }
    if (contractName && !thumbnails) {
      getCollectionThumbnails();
    }
    if (contract && !projectChain) {
      setProjectChain(GET_CHAIN_BY_ID(parseInt(contract.chainid)));
    }
  }, [
    getName,
    getContractOwner,
    getCoverImage,
    isVerified,
    isAllowlistMember,
    contractStatus,
    getContractStatus,
    setContractStatus,
    contractName,
    contract,
    isPreview,
    cover,
    thumbnails,
    getCollectionThumbnails,
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white relative md:overflow-hidden px-0 md:px-8 apply-font">
      <div className="hidden">
        <FontPicker
          activeFontFamily={(claim.fontFamily as string) ?? undefined}
          apiKey={process.env.REACT_APP_GOOGLE_FONTS_API_KEY!}
        />
      </div>
      <div
        className="absolute z-0 min-h-full w-full left-0 top-0"
        style={{
          background: `${claim.primaryColor}`,
        }}
      />
      <div className="flex flex-col items-center relative z-1 w-full h-full py-20 px-2 md:px-12 scrollbar-hide md:overflow-auto">
        <div className="flex items-center p-2 m-10 gap-2 rounded-3xl bg-[#1b1a1f] drop-shadow-lg">
          <span className="md:text-xl p-3 rounded-2xl">
            Contract:
            <a
              className="mx-2"
              href={`${projectChain?.etherscanUrl}/address/${claim?.contract}`}
              target="_blank"
              rel="noreferrer"
            >
              {claim?.contract?.slice(0, 6)}...
              {claim?.contract?.slice(-6)}
            </a>
          </span>
          <div className="flex flex-row space-x-3">
            {claim.discord && (
              <a
                href={claim.discord}
                target="_blank"
                rel="nofollow, noreferrer"
              >
                <FaDiscord size="40" />
              </a>
            )}
            {claim.email && (
              <a href={claim.email} target="_blank" rel="nofollow, noreferrer">
                <HiOutlineMail size="40" />
              </a>
            )}
            {claim.twitter && (
              <a
                href={claim.twitter}
                target="_blank"
                rel="nofollow, noreferrer"
              >
                <BsTwitter size="40" />
              </a>
            )}
          </div>
        </div>
        <div className="w-[500px] z-30">
          <Slider {...stackSettings}>
            <div className="flex rounded-2xl w-full max-h-[500px] outline-none overflow-hidden">
              <img
                src={cover}
                alt=""
                className="object-cover h-full w-full rounded-2xl"
              />
            </div>
            {thumbnails &&
              Object.keys(thumbnails).map((i: string) => (
                <div
                  key={`${contractName}-${i}`}
                  className="flex rounded-2xl h-[500px] outline-none overflow-hidden"
                >
                  <img
                    key={`${contractName}-${i}`}
                    alt={`${i}`}
                    src={thumbnails[parseInt(i)]}
                    title={`${contractName}-${i}`}
                    className="object-cover h-full w-full rounded-2xl"
                  />
                </div>
              ))}
          </Slider>
        </div>
        {contractStatus === 'none' && (
          <button className="p-4 rounded-3xl text-2xl bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500">
            Mint not active
          </button>
        )}
        {contractStatus === 'claim' &&
          (isVerified ? (
            claimTxHash ? (
              <a
                className="px-5 py-2 rounded-2xl text-sm bg-emerald-800 text-white w-64 mx-auto text-center my-4"
                href={`${projectChain?.etherscanUrl}/tx/${claimTxHash}`}
                target="_blank"
                rel="noreferrer"
              >
                Success: Check transaction
              </a>
            ) : (
              <button
                className="p-4 rounded-3xl text-2xl bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500 drop-shadow-lg"
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
            <button className="p-4 rounded-3xl text-2xl bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500 drop-shadow-lg">
              Mint not active
            </button>
          ))}
        {contractStatus === 'mint' &&
          (txHash ? (
            <a
              className="p-4 rounded-3xl text-2xl bg-emerald-800 text-white w-64 mx-auto text-center my-4"
              href={`${projectChain?.etherscanUrl}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              Success: Check transaction
            </a>
          ) : (
            <button
              className="p-4 rounded-3xl text-2xl bg-[#1b1a1f] text-white w-40 mx-auto my-4 disabled:bg-gray-500 drop-shadow-lg"
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
        <a target="_blank" rel="noreferrer" href="/">
          <div className="text-right text-sm text-white flex justify-end">
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
  );
};

export default FreeTier;
