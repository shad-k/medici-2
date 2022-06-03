
import React from 'react'
import useSWR from 'swr'
import apiClient from '../utils/apiClient'
import { CONFIG } from '../utils/config'

const localenv = CONFIG.DEV

type UseContractCoverReturn = {
    data?: any
    error?: any
}

const useContractCover = (contractName: string): UseContractCoverReturn  => {
  console.log("Getting cover for: " + contractName);
  const { data, error } = useSWR<any>(
    [localenv.api.paths.getCover],
    async (url) =>
      await apiClient.post
      (url, {"contractName": contractName},
      { 
        headers: { "Content-Type": "application/json"},
        responseType: 'arraybuffer',
      }
      ).then((res: any) => {
        console.log(res);
        const base64 = 'data:application/json;base64,' + btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        return Promise.resolve(base64);
      })
  )
  return { data, error }
}

export default useContractCover