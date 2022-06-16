import React from 'react'
import apiClient from './apiClient'
import { CONFIG } from './config'

const localenv = CONFIG.DEV

export const checkNameAvailability = async (name: string) => {
    if (name === "") {
        return Promise.resolve(false);
    }
    const request_data = {
        "name": name
    }
    
    return apiClient.post(
        localenv.api.paths.checkName,
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

export const uploadCoverImage = async (name: string, file: File) => {
    const formdata = new FormData();
    formdata.append("cover", file)
    
    return apiClient.post(
      localenv.api.paths.uploadImageCover,
      formdata,
      {
        "headers": {"Content-Type": "form-data"},
        "params": {"collection": name},
      })
      .then(function(response) {
        return Promise.resolve(true);
      }).catch(function(error){
        return Promise.resolve(false);
      });
}

export const triggerUploadImageData = async (
    name: string,
    hasMetadata: boolean,
    formdata: FormData,
    onImageDataProgress: any) => {
    return apiClient.post(
      localenv.api.paths.uploadImageData,
      formdata,
      {
        "headers": {"Content-Type": "form-data"},
        "params": {"collection": name},
        "onUploadProgress": onImageDataProgress
      },
      ).then((response) => {
        // console.log(response);
        const res = {
            baseURI: response.data.baseURI,
            totalSupply: response.data.totalSupply,
            randomImageURL: response.data.randomImageURL,
            randomMetadataURL: response.data.randomMetadataURL
        }
        return Promise.resolve(res);
      }).catch((error) => {
        return Promise.reject("error");
    })
  }

export const triggerUploadMetadata = async (
name: string,
formdata: FormData,
onMetadataProgress: any) => {
return apiClient.post(
    localenv.api.paths.uploadMetadata,
    formdata,
    {
    "headers": {"Content-Type": "form-data"},
    "params": {"collection": name},
    "onUploadProgress": onMetadataProgress
    },
    ).then((response) => {
    console.log(response);
    return Promise.resolve("ok");
    }).catch((error) => {
    return Promise.reject("error");
})
}


export const getContractCover = async (contract: string) => {
    console.log("Getting cover for " + contract);
    return apiClient.post
    (localenv.api.paths.getCover, 
    { "contractName": contract },
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