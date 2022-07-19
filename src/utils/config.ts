export const API_ENDPOINT = 'https://athensgate.xyz';

export enum API_PATHS {
  GET_MERKLE_ROOT = '/getMerkleRoot',
  GET_MERKLE_PROOF = '/getMerkleProof',
  REGULUS_TEST = '/regulusTest',
  GET_NEW_LAUNCHED_CONTRACT = '/getNewLaunchedContract',
  GET_ALL_LAUNCHED_CONTRACTS = '/getAllLaunchedContracts',
  GET_CONTRACT_BY_NAME = '/getContractDetails',
  WHITELIST = '/whitelist',
  COLLECTION = '/collections',
  CLAIM_FETCH = '/claims/fetch',
  CLAIM_COVER = '/retrieve/cover',
  CLAIM_SETUP = '/claims/setup',
  UPLOAD_COVER = '/upload/cover',
  UPLOAD_COLLECTION_DATA = '/upload/collection',
  UPLOAD_MUSIC_DATA = '/upload/musicCollection',
  CHECK_NAME = '/claims/checkNameAvailability',
  RESERVE_NFT = '/reservations/reserve',
  GET_RESERVED_NFTS = '/reservations/status',
  RETRIEVE_THUMBNAILS = '/retrieve/thumbnails',
  RETRIEVE_PREVIEW = '/retrieve/preview',
  RETRIEVE_CHAIN_CONFIG = '/retrieve/chainConfig',
  RETRIEVE_CONTRACT_STATUS = '/retrieve/contractStatus'
}

export const CONFIG = {
  DEV: {
    env: 'DEV',
    network: {
      label: 'GOERLI',
      id: '0x5',
      token: 'ETH',
      rpcUrl:
        'https://eth-goerli.alchemyapi.io/v2/cgHuBwD5rDkESlnFr3ee92PLMp3pkfyE',
      txEtherscanUrl: 'https://goerli.etherscan.io/tx/',
      addressEtherscanUrl: 'https://goerli.etherscan.io/address/',
    },
    contract: {
      factory_address: '0x053e59FD6A01Ba3d30beacaEaF0f3504d65baA73',
      factory_abi: [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_impl",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "instance",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "claimsStartBlock",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "mintStartBlock",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "masterAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "factoryAddress",
              "type": "address"
            }
          ],
          "name": "ERC721RandomCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newAddress",
              "type": "address"
            }
          ],
          "name": "changeImplAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_symbol",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_baseuri",
              "type": "string"
            },
            {
              "internalType": "bytes32",
              "name": "_merkleroot",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "_maxSupply",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_maxMintPerPerson",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_masterAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_claimsStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_mintStartBlock",
              "type": "uint256"
            }
          ],
          "name": "createContract",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      instanceAbi: [
        {
          "inputs": [],
          "name": "PRBMathSD59x18__DivInputTooSmall",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "rAbs",
              "type": "uint256"
            }
          ],
          "name": "PRBMathSD59x18__DivOverflow",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "x",
              "type": "int256"
            }
          ],
          "name": "PRBMathSD59x18__Exp2InputTooBig",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "x",
              "type": "int256"
            }
          ],
          "name": "PRBMathSD59x18__ExpInputTooBig",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "x",
              "type": "int256"
            }
          ],
          "name": "PRBMathSD59x18__FromIntOverflow",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "x",
              "type": "int256"
            }
          ],
          "name": "PRBMathSD59x18__FromIntUnderflow",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "x",
              "type": "int256"
            }
          ],
          "name": "PRBMathSD59x18__LogInputTooSmall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PRBMathSD59x18__MulInputTooSmall",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "rAbs",
              "type": "uint256"
            }
          ],
          "name": "PRBMathSD59x18__MulOverflow",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "prod1",
              "type": "uint256"
            }
          ],
          "name": "PRBMath__MulDivFixedPointOverflow",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "prod1",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "denominator",
              "type": "uint256"
            }
          ],
          "name": "PRBMath__MulDivOverflow",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newClaimsStartBlock",
              "type": "uint256"
            }
          ],
          "name": "ClaimsStartBlockUpdate",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "mintedTo",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "ERC721RandomClaimed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "symbol",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "mintedTo",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "ERC721RandomMinted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newPrice",
              "type": "uint256"
            }
          ],
          "name": "GDADisabled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "startingPrice",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "int256",
              "name": "scaleFactor",
              "type": "int256"
            },
            {
              "indexed": false,
              "internalType": "int256",
              "name": "decayConstant",
              "type": "int256"
            }
          ],
          "name": "GDAEnabled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newMintStartBlock",
              "type": "uint256"
            }
          ],
          "name": "MintStartBlockUpdate",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_symbol",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_baseuri",
              "type": "string"
            },
            {
              "internalType": "bytes32",
              "name": "_merkleroot",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "_supply",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_maxMintPerPerson",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_masterAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_claimsStartBlock",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_mintStartBlock",
              "type": "uint256"
            }
          ],
          "name": "_initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newURI",
              "type": "string"
            }
          ],
          "name": "changeBaseURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "newBlock",
              "type": "uint256"
            }
          ],
          "name": "changeClaimsPeriodStart",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_maxMintPerPerson",
              "type": "uint256"
            }
          ],
          "name": "changeMaxMintPerPerson",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_merkleroot",
              "type": "bytes32"
            }
          ],
          "name": "changeMerkleRoot",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "newBlock",
              "type": "uint256"
            }
          ],
          "name": "changeMintPeriodStart",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "changePrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "checkBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "numOfTokensToMint",
              "type": "uint256"
            },
            {
              "internalType": "bytes32[]",
              "name": "proof",
              "type": "bytes32[]"
            }
          ],
          "name": "claim",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "claimsStartBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_newStartPrice",
              "type": "uint256"
            }
          ],
          "name": "disableGDA",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_startingPrice",
              "type": "uint256"
            },
            {
              "internalType": "int256",
              "name": "_scaleFactor",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "_decayConstant",
              "type": "int256"
            }
          ],
          "name": "enableGDA",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "masterAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "maxMintPerPerson",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "maxSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "numOfTokensToMint",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "mintStartBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "price",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "numTokens",
              "type": "uint256"
            }
          ],
          "name": "purchasePrice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "root",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newMasterAddress",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      claim_contract: '0x1B4F93D2722a12e621cAC51DDDe63A97AB93580e',
      claim_abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "low",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "mid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "high",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_masterAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "tier",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "DepositReceived",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tier",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "newPrice",
              "type": "uint256"
            }
          ],
          "name": "changeTierPrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tier",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "contractAddress",
              "type": "address"
            }
          ],
          "name": "depositForClaimsPage",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "tier",
              "type": "string"
            }
          ],
          "name": "getPricing",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
    },
    api: {
      endpoint: 'https://athensgate.xyz',
      paths: {
        getMerkleRoot: '/getMerkleRoot',
        whitelist: '/whitelist',
        getNewLaunchedContract: '/getNewLaunchedContract',
        getAllLaunchedContracts: '/getAllLaunchedContracts',
        test: '/regulusTest',
        uploadImageCover: '/upload/cover',
        uploadImageData: '/upload/collection',
        uploadMetadata: 'upload/metadata',
        checkName: '/claims/checkNameAvailability',
        launchClaim: '/claims/setup',
        getCover: '/retrieve/cover',
        reserve: '/reservations/reserve',
        reservedStatus: '/reservations/status',
      },
    },
  },
};
