import React from 'react'
import useSWR from 'swr'
import apiClient from '../utils/apiClient'
import { API_PATHS } from '../utils/config'

const useCollections = () => {
  const { data, error } = useSWR(
    API_PATHS.COLLECTIONS,
    (url) =>
      apiClient(url).then((res) => {
        return res.data.data.tokenContracts
      }),
    {
      refreshInterval: 0,
    }
  )
  return { data, error }
}

export default useCollections
