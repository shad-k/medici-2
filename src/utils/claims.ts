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