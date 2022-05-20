import { ethers } from 'ethers'
import { ContractCreationProps, WhitelistProps, ContractCreationReturn } from '../model/types'

import { CONFIG } from './config'
import apiClient from './apiClient'
const localenv = CONFIG.DEV;

export const whitelist = async (props: WhitelistProps) => {
    return apiClient.post(
        localenv.api.paths.whitelist, props,
        {
            headers: {"Content-Type": "application/json"}
        }
    ).then(function(response) {
        console.log(response.data)
        return Promise.resolve(response.data)
    }).catch(function(error) {
        console.log(error)
        return Promise.reject("Error doing whitelisting")
    });
}

export const getNewLaunchedContract = async (masterAddress: string, name: string, symbol: string): Promise<string> => {
    const request_data = {
        "masterAddress": masterAddress,
        "name": name,
        "symbol": symbol
    }
    
    return apiClient.post(
        localenv.api.paths.getNewLaunchedContract, request_data,
        {
            headers: {"Content-Type": "application/json"}
        }
    ).then(function(response) {
        console.log(response.data)
        return Promise.resolve(response.data)
    }).catch(function(error) {
        console.log(error)
        return Promise.reject("Error fetching contract")
    });
}

export const generateNewContract = (callerWallet: any, merkleRoot: string, props: ContractCreationProps): Promise<ContractCreationReturn> => {
    return new Promise( async (resolve, reject ) => {
        const provider = new ethers.providers.Web3Provider(callerWallet.provider)
        const signer = provider.getSigner(callerWallet.accounts[0].address);
        const FactoryContract = new ethers.Contract(localenv.contract.factory_address, localenv.contract.factory_abi, signer);
        
        console.log("generating...")
        await FactoryContract.createContract(
        props.name, // name
        props.symbol, // symbol
        props.baseuri, // base URI
        merkleRoot, // merkle root
        props.maxSupply, // max supply
        props.price, // price
        props.maxMintsPerPerson, // max mint per person
        props.masterAddress // master address
        ).catch((error: Error) => {
            reject(error.message);
        })

        FactoryContract.on("ERC721RandomCreated", (name: string, symbol: string, instance: any, masterAddress: any) => {
            resolve ({
                "name": name,
                "symbol": symbol,
                "instance": instance,
                "masterAddress": masterAddress
            })
        })
    })
}


export const getMerkleRoot = async (whitelistAddresses: string[]):Promise<string> => {
    const request_data = {
        "whitelistedAddresses" : whitelistAddresses,
    }

    return apiClient.post(
        localenv.api.paths.getMerkleRoot, request_data, 
        {
            headers: {"Content-Type": "application/json"}
        }
    ).then(function(response) {
        console.log(response.data)
        return Promise.resolve(response.data)
    }).catch(function(error) {
        return Promise.reject("Error getting merkle root")
    });
}

export const getLatestLaunchedContract = async (masterAddress: string, name: string, symbol: string): Promise<string> => {
    const request_data = {
        "masterAddress": masterAddress,
        "name": name,
        "symbol": symbol
    }

    return apiClient.post(
        localenv.api.paths.getNewLaunchedContract, request_data,
        {
            headers: {"Content-Type": "application/json"}
        }
    ).then(function (response) {
        console.log(response.data)
        return Promise.resolve(response.data)
    }).catch(function(error) {
        return Promise.reject("Error getting latest contract")
    })
}


export const withdrawBalance = async (callerWallet: any, contractAddress: any): Promise<any> => {
    const provider = new ethers.providers.Web3Provider(callerWallet.provider)
    const signer = provider.getSigner(callerWallet.accounts[0].address);
    // needs bytecode or abi to call ethers contract
    const myContract = new ethers.Contract(contractAddress, localenv.contract.instanceAbi, signer);
    await myContract.withdraw()
    .then
    ((response: any) => {
        console.log(response)
        return Promise.resolve({
            success: true,
            status: response
        })
    })
    .catch
    ((error: any) => {
        return Promise.reject({
            success: false,
            status: error
        })
    })
}
