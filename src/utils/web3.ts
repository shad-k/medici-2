import { ethers } from 'ethers'
import { ContractCreationProps } from '../model/types'

import { TEST_CONFIG, API_PATHS, API_ENDPOINT } from './config'
import apiClient from './apiClient'
import { AnyRecord } from 'dns'
import { MdDataExploration } from 'react-icons/md'

export const generateNewContract = async (props: ContractCreationProps) => {

    // try {
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

        // let data;
        // FactoryContract.on("ERC721RandomCreated", (name: string, symbol: string, instance: any, masterAddress: any) => {
        //     console.log(name)
        //     console.log(symbol)
        //     console.log(instance)
        //     console.log(masterAddress)
        //     data = {
        //         "name": name,
        //         "symbol": symbol,
        //         "instance": instance,
        //         "masterAddress": masterAddress
        //     }
        //     console.log(data)
        //     return data;
        // });
        await result.wait(5);
        console.log(result);
        // } catch {
        //     return 'error'
        // }

    // await apiClient.post(
    //     API_PATHS.GET_NEW_LAUNCHED_CONTRACT, 
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers": "*"
    //      }
    //     }
    // ).then(function(response) {
    //     console.log(response)
    //     return ('success')
    // }).catch(function(error) {
    //     console.log(error)
    //     return ('failure')
    // });

}

export const getMerkleRoot = async (whitelistAddresses: string[]) => {
    const request_body = JSON.stringify(whitelistAddresses);
    console.log(request_body);
    console.log("Getting merkle root at " + API_ENDPOINT + API_PATHS.GET_MERKLE_ROOT)
    
    // await apiClient.get(
    //     '/regulusTest', 
    //     // request_body,
    //     {
    //         headers: { "Content-Type": "application/json" }
    //     }
    // ).then(function(response) {
    //     console.log(response)
    //     return ('success')
    // }).catch(function(error) {
    //     console.log(error)
    //     return ('failure')
    // });
    // await apiClient.post(
    //     API_PATHS.GET_MERKLE_ROOT, 
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers": "*"
    //      }
    //     }
    // ).then(function(response) {
    //     console.log(response)
    //     return ('success')
    // }).catch(function(error) {
    //     console.log(error)
    //     return ('failure')
    // });
    return ('0x141e537bf36e002e309cdb515487754bc9389561c2b618020c1980e5a8a014c8')
//    return ('failure')
}

// export const withdrawBalance = async (callerWallet: WalletState) => {
//     const provider = new ethers.providers.Web3Provider(callerWallet.provider)
//     const signer = provider.getSigner(callerWallet.accounts[0].address);

// }