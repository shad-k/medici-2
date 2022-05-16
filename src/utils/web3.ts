import { ethers } from 'ethers'
import { ContractCreationProps } from '../model/types'

import { TEST_CONFIG, API_PATHS } from './config'
import apiClient from './apiClient'

export const generateNewContract = async (props: ContractCreationProps) => {

    try {
        const provider = new ethers.providers.Web3Provider(props.callerWallet.provider)
        const signer = provider.getSigner(props.callerWallet.accounts[0].address);
        const FactoryContract = new ethers.Contract(TEST_CONFIG.FACTORY_ADDRESS, TEST_CONFIG.CONTRACT_ABI, signer);

        console.log(FactoryContract);
        const result = await FactoryContract.createContract(
            props.name, // name
            props.symbol, // symbol
            props.baseuri, // base URI
            props.merkleRoot, // merkle root
            props.maxSupply, // max supply
            props.price, // price
            props.maxMintsPerPerson, // max mint per person
            props.masterAddress // master address
        );

        let data;
        FactoryContract.on("ERC721RandomCreated", (name: string, symbol: string, instance: any, masterAddress: any) => {
            console.log(name)
            console.log(symbol)
            console.log(instance)
            console.log(masterAddress)
            data = {
                "name": name,
                "symbol": symbol,
                "instance": instance,
                "masterAddress": masterAddress
            }
            console.log(data)
            return data;
        });
        await result.wait(5);
        console.log(result);
        } catch {
            return 'error'
        }
}

export const getMerkleRoot = async (whitelistAddresses: string[]) => {
    const request_data = {
        "whitelistedAddresses" : whitelistAddresses,
    }

    const { success, data } = await apiClient.post(
        API_PATHS.GET_MERKLE_ROOT, request_data
    ).then(function(response) {
        return {
            success: true,
            data: response.data
        }
    }).catch(function(error) {
        return {
            success: false,
            data: error
        }
    });

    return { success, data }
}

// export const withdrawBalance = async (callerWallet: WalletState) => {
//     const provider = new ethers.providers.Web3Provider(callerWallet.provider)
//     const signer = provider.getSigner(callerWallet.accounts[0].address);

// }