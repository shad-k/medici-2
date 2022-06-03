import React from 'react'
import apiClient from '../utils/apiClient'
import { CONFIG } from '../utils/config'

const localenv = CONFIG.DEV


export const getContractCover = (contractName: string) => {
    console.log("Getting cover for " + contractName);
    return apiClient.post
    (localenv.api.paths.getCover, 
    {"contractName": contractName},
    { 
    headers: { "Content-Type": "application/json"},
    responseType: 'arraybuffer',
    }
    ).then((res: any) => {
    console.log(res.request_data);
    const base64 = 'data:application/json;base64,' + btoa(
        new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
        )
    )
    return Promise.resolve(base64)
    }).catch((error) => {
    console.log(error);
    return Promise.reject(error)
    });
}