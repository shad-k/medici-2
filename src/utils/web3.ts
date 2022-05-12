import useSWR from 'swr'
import type { WalletState } from '@web3-onboard/core'
import ethers from 'ethers'
import { TEST_CONFIG, API_PATHS, API_ENDPOINT } from './config'
import apiClient from './apiClient'



export const generateContract = async (callerWallet: WalletState) => {
    const provider = new ethers.providers.Web3Provider(callerWallet.provider)
    const signer = provider.getSigner(callerWallet.accounts[0].address);
}

export const getMerkleRoot = async (whitelistAddresses: string[]) => {
    console.log("Getting merkle root at " + API_ENDPOINT + API_PATHS.GET_MERKLE_ROOT)
    
    apiClient.post(API_PATHS.GET_MERKLE_ROOT, whitelistAddresses,
    ).then(function(response) {
        console.log(response)
        return {
            success: true,
            merkleroot: 'success'
        };
    }).catch(function(error) {
        console.log(error)
        return {
            success: false,
            merkleroot: 'failure'
        };
    });
    return {
        success: false,
        merkleroot: 'nothing'
    }
}

// async function generateContract(collection: Collection) {
//     // const merkleroot = getMerkleRoot(['test1', 'test2', 'test3']);

//     try {
//         const FactoryContract = new ethers.Contract(TEST_CONFIG.FACTORY_ADDRESS, TEST_CONFIG.CONTRACT_ABI, signer)
//         const result = await FactoryContract.createContract(
//             collection.name,
//             collection.symbol,
//             '{}',
//             '{merkleroot}',
//             collection.numTokens,
//             collection.floor_price,
//             '10',
//             TEST_CONFIG.MASTER_ADDRESS
//         )
//     } catch {
//         console.log("error")
//     }

// }