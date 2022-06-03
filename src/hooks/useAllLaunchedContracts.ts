
import React from 'react'
import useSWR from 'swr'
import apiClient from '../utils/apiClient'
import { ethers, utils } from 'ethers';
import { CONFIG } from '../utils/config'

import { Contract } from '../model/types'

const localenv = CONFIG.DEV

type UseProjectsReturn = {
    data?: Array<Contract>
    error?: any
}

const useAllLaunchedContracts = (masterAddress: string): UseProjectsReturn  => {
  const { data, error } = useSWR<Array<Contract>>(
    [localenv.api.paths.getAllLaunchedContracts],
    async (url) =>
      await apiClient.post
      (url, {"masterAddress": utils.getAddress(masterAddress)},
      { 
        headers: { "Content-Type": "application/json"}
      }
      ).then((res) => {
        // console.log(res)
        return res.data
      }),
  )
  return { data, error }
}

export default useAllLaunchedContracts