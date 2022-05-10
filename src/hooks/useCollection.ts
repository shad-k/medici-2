import useSWR from 'swr'

import { Collection } from '../model/types'
import apiClient from '../utils/apiClient'
import { API_PATHS } from '../utils/config'

type UseCollectionReturn = {
  data?: Collection
  error?: unknown
}
const useCollection = (slug: string): UseCollectionReturn => {
  const { data, error } = useSWR<Collection>(
    [API_PATHS.COLLECTION, slug],
    (url, slug) => {
      return apiClient(`${url}/${slug}`).then((res) => {
        return res.data.data.tokenContract
      })
    }
  )
  return { data, error }
}

export default useCollection
