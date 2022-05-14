export const API_ENDPOINT = 'https://athensgate.xyz'

export enum API_PATHS {
  COLLECTIONS = '/lyracollections',
  COLLECTION = '/collection',
  TEMP_URL = '/collections',
  TEMP_REGULUS_URL = '/testing',
  GET_MERKLE_ROOT = '/getMerkleRoot',
  REGULUS_TEST = '/regulusTest',
  GET_NEW_LAUNCHED_CONTRACT = '/getNewLaunchedContract'
}

export const TEST_CONFIG = {
  "NETWORK": "KOVAN",
  "FACTORY_ADDRESS": "0x19962A35700c88Ae86F55b2FA27d66358B4768B5",
  "CONTRACT_ABI": 
  [
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
          "internalType": "address",
          "name": "masterAddress",
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
  "MASTER_ADDRESS": "0x1908976aE1CDF070F282D678980731de7D5B9D54"
}