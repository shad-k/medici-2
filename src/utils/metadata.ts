import apiClient from './apiClient'
import { CONFIG } from './config'

export const getGatewayURL = (url: string): string => {
  return url.replace("https://gateway.pinata.cloud/ipfs/", "https://medici-test.mypinata.cloud/ipfs/")
}

export const getMetadata = async (metadataurl: string) => {
  console.log("getting metadata for " + metadataurl)
  return apiClient.get(getGatewayURL(metadataurl)).
  then((response) => { 
    console.log(response); return response.data; } )
}
