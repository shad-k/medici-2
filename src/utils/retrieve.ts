import apiClient from './apiClient';
import { API_PATHS, CONFIG } from './config';
import { ChainConfigReturn } from '../model/types';
import { utils } from 'ethers';

export const getGatewayURL = (url: string): string => {
  return url.replace(
    'https://gateway.pinata.cloud/ipfs/',
    'https://medici-test.mypinata.cloud/ipfs/'
  );
};

export const getMetadata = async (metadataurl: string) => {
  // console.log("getting metadata for " + metadataurl)
  return apiClient.get(getGatewayURL(metadataurl)).
  then((response) => { 
    return response.data; } )
}

export const getChainConfig = async (chain: string): Promise<ChainConfigReturn> => {
  // console.log("Getting config for chain " + chain)
  const request_data = {
    "chainid": chain
  }
  return apiClient.get(
  API_PATHS.RETRIEVE_CHAIN_CONFIG,
  { params: request_data }
  ).then(function(response) {
    // console.log(response.data)
    return Promise.resolve(response.data)
  }).catch(function(error) {
    // console.log(error)
    return Promise.reject("Error getting chain config")
  });
}

export const getNameAvailability = async (
  name: string,
  connectedChain: string
) => {
  if (name === '') {
    return Promise.resolve(false);
  }
  const request_data = {
    "collection": name,
    "chainid": parseInt(connectedChain, 16)
  }
  
  return apiClient.get(
      API_PATHS.CHECK_NAME,
      { params: request_data },
  ).then(function(response) {
      // console.log(response.data)
      if (response.data.value === true) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
  }).catch(function(error) {
      // console.log(error);
      return Promise.reject("Error checking name availability")
  });
}

export const getContractCover = async (contract: string) => {
  // console.log("Getting contract cover for " + contract);
  const request_data = {
    collection: contract,
  };
  const res = await apiClient
    .get(API_PATHS.CLAIM_COVER, { params: request_data, responseType: 'blob' })
    .then(function (res) {
      if (res.status === 200) {
        return res.data;
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  if (res) {
    return Promise.resolve(URL.createObjectURL(res));
  } else {
    return Promise.reject('error');
  }
};

export const getContractClaimStatus = async (contractName: string, chainid: string): Promise<any> => {
  const request_data = {
    "collection": contractName,
    "chainid": chainid
  }
  
  return apiClient.get(
    API_PATHS.RETRIEVE_CONTRACT_STATUS,
    {params: request_data}
    ).then(function (response) {
      console.log(response)
      return Promise.resolve({
        success: true,
        status: response.data.contractStatus,
      });
    })
    .catch(function (error) {
      return Promise.reject({
        success: false,
        status: 'error getting contract status',
      });
    });
};

export const getAllContracts = async (
  masterAddress: string,
  connectedChain: string
): Promise<any> => {
  const request_data = {
    masterAddress: utils.getAddress(masterAddress),
    chainID: parseInt(connectedChain, 16),
  };
  return apiClient.post(
    API_PATHS.GET_ALL_LAUNCHED_CONTRACTS,
    request_data,
    { 
      headers: { "Content-Type": "application/json"}
    }
    ).then(function (response) {
      // console.log(response)
      return Promise.resolve({
        status: 'success',
        contracts: response.data.launchedContracts
      })
    }).catch(function (error) {
      // console.log(error)
      return Promise.reject({
        status: 'failure',
        contracts: null,
      });
    });
};
