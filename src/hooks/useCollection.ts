import useSWR from 'swr'

import apiClient from '../utils/apiClient'
import { API_PATHS } from '../utils/config'

const useCollection = (slug: string) => {
  const { data, error } = useSWR<any>(
    [API_PATHS.COLLECTION, slug],
    async (url, slug) => {
      return apiClient(`${url}/${slug}`).then((res) => {
        return res.data.data.tokenContract
      })
    }
  )
  return { data, error }
}

export default useCollection