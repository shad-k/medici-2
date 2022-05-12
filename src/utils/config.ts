export const API_ENDPOINT = 'https://athensgate.xyz'

export enum API_PATHS {
  COLLECTIONS = '/lyracollections',
  COLLECTION = '/collection',
  TEMP_URL = '/collections',
  TEMP_REGULUS_URL = '/testing',
  GET_MERKLE_ROOT = '/getMerkleRoot'
}

export const TEST_CONFIG = {
  "NETWORK": "KOVAN",
  "FACTORY_ADDRESS": "0x19962A35700c88Ae86F55b2FA27d66358B4768B5",
  "CONTRACT_ABI": 
  [
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
  "MASTER_ADDRESS": "0x00000000000000"
}