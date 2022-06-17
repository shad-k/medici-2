import useSWR from 'swr'

import apiClient from '../utils/apiClient'
import { API_PATHS } from '../utils/config'

const useReservedNFTs = (contractName: string) => {
  const { data, error } = useSWR<any>(
    [API_PATHS.GET_RESERVED_NFTS],
    async (url) => 
      apiClient.post
      (url,
      {
        "contractName": contractName
      }, 
      {
        headers: {"Content-Type": "application/json"}
      }).then((res) => {
        return res.data;
      }),
      {
        refreshInterval: 30,
      }
    )
  return { data, error }
}

export default useReservedNFTs