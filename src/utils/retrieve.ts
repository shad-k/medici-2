import apiClient from './apiClient'
import { API_PATHS, CONFIG } from './config'
import { ChainConfigReturn } from '../model/types'


export const getGatewayURL = (url: string): string => {
  return url.replace("https://gateway.pinata.cloud/ipfs/", "https://medici-test.mypinata.cloud/ipfs/")
}

export const getMetadata = async (metadataurl: string) => {
  console.log("getting metadata for " + metadataurl)
  return apiClient.get(getGatewayURL(metadataurl)).
  then((response) => { 
    return response.data; } )
}

export const getChainConfig = async (chain: string): Promise<ChainConfigReturn> => {
  const request_data = {
    "chainID": chain
  }
  return apiClient.post(
  API_PATHS.RETRIEVE_CHAIN_CONFIG,
  request_data,
  {
    headers: {"Content-Type": "application/json"}
  }).then(function(response) {
    console.log(response.data)
    return Promise.resolve(response.data)
  }).catch(function(error) {
    console.log(error)
    return Promise.reject("Error doing whitelisting")
  });
}

export const getNameAvailability = async (name: string) => {
  if (name === "") {
      return Promise.resolve(false);
  }
  const request_data = {
      "name": name
  }
  
  return apiClient.post(
      API_PATHS.CHECK_NAME,
      request_data,
      {
          headers: {"Content-Type": "application/json"}
      }
  ).then(function(response) {
      console.log(response.data)
      if (response.data.value === true) {
          return Promise.resolve(true)
      } else {
          return Promise.resolve(false)
      }
  }).catch(function(error) {
      console.log(error);
      return Promise.reject("Error checking name availability")
  });
}

export const getContractCover = async (contract: string) => {
  const request_data = {
    "contractName": contract,
  }
  return apiClient.post(
  API_PATHS.CLAIM_COVER,
  request_data,
  { 
      headers: { "Content-Type": "application/json"},
      responseType: 'arraybuffer',
  }
  ).then((res: any) => {
    const base64 = 'data:application/json;base64,' + btoa(
    new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
    )
  )
    return Promise.resolve(base64)
  }).catch((error) => {
    console.log(error);
    return Promise.reject("error")
  });
}