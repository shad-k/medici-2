import React from 'react'
import apiClient from './apiClient'
import { API_PATHS, CONFIG } from './config'

const localenv = CONFIG.DEV;

export const makeReservation = async (contractName: string, tokenID: number, contactString: string, reserveMethod: number):Promise<boolean> => {
  /* FIXME: not complete */
  let field;
  if (reserveMethod === 0) {
    field = 'email'
  } else if (reserveMethod === 1) {
    field = 'userAddress'
  } else if (reserveMethod === 2) {
    field = 'ens'
  } else {
    return Promise.reject("Invalid reserve method")
  }

  const request_data = JSON.parse(
    `{"contractName":"${contractName}",
    "tokenID":"${tokenID}",
    "${field}":"${contactString},"}`
  );
  console.log(request_data);

  return apiClient.post(
    API_PATHS.RESERVE_NFT,
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
      return Promise.reject("Error making reservation")
  });

}

export const getThumbnails = async (contractName: string): Promise<any> => {
    const request_data = {
      "collection": contractName
    };

    return apiClient.get(
      API_PATHS.RETRIEVE_THUMBNAILS,
      { params: request_data }
    ).then(function(response: any) {
      return Promise.resolve(response.data)
    }).catch(function(error) {
      return Promise.reject(["Error getting thumbnails"])
    });
}

export const getPreviews = async (contractName: string): Promise<any> => {
  const request_data = {
    "collection": contractName
  };
  
  return apiClient.get(
    API_PATHS.RETRIEVE_PREVIEW,
    { params: request_data }
  ).then(function(response: any) {
    return Promise.resolve(response.data)
  }).catch(function(error) {
    return Promise.reject(["Error getting previews"])
  });
}