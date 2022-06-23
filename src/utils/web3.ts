import { BigNumber, ethers, utils } from 'ethers'
import { ContractCreationProps, WhitelistProps, Contract } from '../model/types'

import { CONFIG } from './config'
import apiClient from './apiClient'
const localenv = CONFIG.DEV;

/* call when new contract is created to update backend */
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

/* call to verify backend results */
export const getNewLaunchedContract = async (masterAddress: string): Promise<Contract> => {
    const request_data = {
        "masterAddress": masterAddress,
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

/* generate a new smart contract from user input */
export const generateNewContract = (callerWallet: any, merkleRoot: string, props: ContractCreationProps): any => {
    return new Promise( async (resolve, reject ) => {
        const provider = new ethers.providers.Web3Provider(callerWallet.provider)
        const signer = provider.getSigner(callerWallet.accounts[0].address);
        const FactoryContract = new ethers.Contract(localenv.contract.factory_address, localenv.contract.factory_abi, signer);

        /*
        function createContract(
        string memory _name,
        string memory _symbol,
        string memory _baseuri,
        bytes32 _merkleroot,
        uint256 _maxSupply,
        uint256 _price,
        uint256 _maxMintPerPerson,
        address _masterAddress
        ) 
        */
        try {
            const result_contract = await FactoryContract.createContract(
            props.name, // name
            props.symbol, // symbol
            props.baseuri, // base URI
            merkleRoot, // merkle root
            props.maxSupply, // max supply
            utils.parseUnits(props.price, 'wei'), // price
            props.maxMintsPerPerson, // max mint per person
            props.masterAddress // master address
            );
            console.log(result_contract);
            await result_contract.wait(5);
            return resolve("Contract generation success");
        } catch {
            return reject("Error creating contract")
        }
    })
}

/* get the merkle root before generating smart contract */
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
        console.log(error)
        return Promise.reject("Error getting merkle root")
    });
}

export const claimsInit = async (callerWallet: any, contractAddress: string, tier: string): Promise<boolean>=> {
    console.log("Tier " + tier);
    if (tier === "free") {
        return Promise.resolve(true);
    } else {
        const provider = new ethers.providers.Web3Provider(callerWallet.provider)
        const signer = provider.getSigner(callerWallet.accounts[0].address);
    
        const claimsContract = new ethers.Contract(localenv.contract.claim_contract, localenv.contract.claim_abi, signer);
        const pricing = await claimsContract.getPricing(tier);
        
        try {
            const result_contract = await claimsContract.depositForClaimsPage(tier, contractAddress, {value: pricing})
            await result_contract.wait(5);
            return Promise.resolve(true);
        } catch {
            return Promise.resolve(false);
        }
        
    }
}

export const isValidAddress = (address: string) => {
    return utils.getAddress(address);
}

export const readyToTransact = async (callerWallet: any, connect: any, setChain: any): Promise<boolean> => {
    if (!callerWallet) {
        await connect({});
    }
    return setChain({ chainId: localenv.network.id })
  }

/* Master Address only Methods */

export const getContract = (callerWallet: any, contractAddress: string) => {
    const provider = new ethers.providers.Web3Provider(callerWallet.provider)
    const signer = provider.getSigner(callerWallet.accounts[0].address);

    const myContract = new ethers.Contract(contractAddress, localenv.contract.instanceAbi, signer);
    return myContract;
}

/* withdraw */
export const withdrawBalance = async (callerWallet: any, contractAddress: string): Promise<any> => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.withdraw()
}

/* begin claim period */
export const startClaimPeriod = async (callerWallet: any, contractAddress: string) => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.turnOnClaimPeriod()
}

/* begin mint period */
export const startMintPeriod = async (callerWallet: any, contractAddress: string) => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.turnOffClaimPeriodAndTurnOnMintPeriod()
}

/* end mint period */
export const endMintPeriod = async (callerWallet: any, contractAddress: string) => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.turnOffMintPeriod()
}

export const changeBaseURI = async (callerWallet: any, contractAddress: string, newUri: string) => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.changeBaseUri(newUri)
} 

export const changePrice = async (callerWallet: any, contractAddress: string, newPrice: string) => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.changePrice(utils.parseUnits(newPrice, 'wei'));
}

export const changeMasterAddress = async (callerWallet: any, contractAddress: string, newMasterAddress: string) => {
    const myContract = getContract(callerWallet, contractAddress)
    await myContract.transferOwnership(newMasterAddress);

    /* need to change owner in regulus backend */
} 

export const getIsClaimPeriod = async (callerWallet: any, contractAddress: string) => {
    const myContract = getContract(callerWallet, contractAddress);
    return myContract.isClaimPeriod();
}

// export const getBalance = async (callerWallet: any, contractAddress: string): Promise<any> => {
//     const myContract = getContract(callerWallet, contractAddress);
//     const balance = await myContract.balance();

//     return balance;
// }