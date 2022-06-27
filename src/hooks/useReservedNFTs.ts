import useSWR from 'swr'

import apiClient from '../utils/apiClient'
import { API_PATHS } from '../utils/config'

const useReservedNFTs = (contractName: string, chainId: string) => {
  const { data, error } = useSWR<any>(
    [API_PATHS.GET_RESERVED_NFTS],
    async (url) => 
      apiClient.get
      (url,
      {params: {
        "collection": contractName,
        "chainid": chainId
      }}, 
      ).then((res) => {
        return res.data;
      }),
      {
        refreshInterval: 30,
      }
    )
  return { data, error }
}

export default useReservedNFTs