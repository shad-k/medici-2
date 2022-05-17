export const API_ENDPOINT = 'https://athensgate.xyz'

export enum API_PATHS {
  GET_MERKLE_ROOT = '/getMerkleRoot',
  REGULUS_TEST = '/regulusTest',
  GET_NEW_LAUNCHED_CONTRACT = '/getNewLaunchedContract',
  COLLECTION = '/collections'
}

export const CONFIG = {
  "DEV": {
    "env": "DEV",
    "network": {
      "label": "Kovan TestNet",
      "id": "0x2a",
      "token": "ETH",
      "rpcUrl": "https://eth-kovan.alchemyapi.io/v2/Nhwt0isGKmoL-652jwR15xcJgvUy59CD"
    },
    "contract": {
    "factory_address": "0x19962A35700c88Ae86F55b2FA27d66358B4768B5",
    "factory_abi": 
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
    ]
    },
    "api": {
      "endpoint": "https://athensgate.xyz",
      "paths": {
        "getMerkleRoot": "/getMerkleRoot",
        "whitelist": "/whitelist",
        "getNewLaunchedContract": "/getNewLaunchedContract",
        "getAllLaunchedContracts": "/getAllLaunchedContracts",
        "test": "/regulusTest"
      }
    }
  },
}