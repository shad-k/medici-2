import type { WalletState } from '@web3-onboard/core'
import { ethers } from 'ethers'
import { ContractCreationProps } from '../model/types'
import { TEST_CONFIG, API_PATHS, API_ENDPOINT } from './config'
import apiClient from './apiClient'

export const generateNewContract = async (props: ContractCreationProps) => {
    const provider = new ethers.providers.Web3Provider(props.callerWallet.provider)
    const signer = provider.getSigner(props.callerWallet.accounts[0].address);
    console.log(provider);
    console.log(signer);

    const FactoryContract = new ethers.Contract(TEST_CONFIG.FACTORY_ADDRESS, TEST_CONFIG.CONTRACT_ABI, signer);
    console.log(FactoryContract);

    const createContractResult = await FactoryContract.createContract(
        props.name, // name
        props.symbol, // symbol
        props.baseuri, // base URI
        props.merkleRoot, // merkle root
        props.maxSupply, // max supply
        props.price, // price
        props.maxMintsPerPerson, // max mint per person
        props.masterAddress // master address
    );
    await createContractResult.wait(5);
    console.log(createContractResult);
}

export const getMerkleRoot = async (whitelistAddresses: string[]) => {
    const request_body = {
        "whitelistAddresses": whitelistAddresses,
    }
    console.log(request_body);
    // console.log("Getting merkle root at " + API_ENDPOINT + API_PATHS.REGULUS_TEST)
    
    // apiClient.post(API_PATHS.GET_MERKLE_ROOT, whitelistAddresses,
    // ).then(function(response) {
    //     console.log(response)
    //     return ('success')
    // }).catch(function(error) {
    //     console.log(error)
    //     return ('failure')
    // });

//     apiClient.get(API_PATHS.REGULUS_TEST,
//         ).then(function(response) {
//             console.log(response)
//             return ('success')
//         }).catch(function(error) {
//             console.log(error)
//             return ('failure')
//         });
//    return ('failure')
    return ('0x141e537bf36e002e309cdb515487754bc9389561c2b618020c1980e5a8a014c8')
}