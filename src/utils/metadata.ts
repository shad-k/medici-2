import apiClient from './apiClient'
import { CONFIG } from './config'

export const getGatewayURL = (url: string): string => {
  console.log("Original url: " + url);
  return url.replace("https://gateway.pinata.cloud/ipfs/", "https://medici-test.mypinata.cloud/ipfs/")
}

export const getMetadata = async (metadataurl: string) => {
  console.log("getting metadata for " + metadataurl)
  return apiClient.get(getGatewayURL(metadataurl)).
  then((response) => { 
    console.log(response.data); return response.data; } )
}
