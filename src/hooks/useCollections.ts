import React from 'react'
import useSWR from 'swr'
import { API_PATHS } from '../utils/config'

const useCollections = () => {
  const { data, error } = useSWR(API_PATHS.COLLECTIONS)
  return { data, error }
}

export default useCollections
