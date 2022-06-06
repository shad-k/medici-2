import React from 'react'
import apiClient from './apiClient'
import { CONFIG } from './config'

const localenv = CONFIG.DEV

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