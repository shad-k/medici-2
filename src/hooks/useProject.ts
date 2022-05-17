import useSWR from 'swr'

import apiClient from '../utils/apiClient'
import { CONFIG } from '../utils/config'

const localenv = CONFIG.DEV;

const useProject = () => {
  const { data, error } = useSWR<any>(
    [localenv.api.paths.getNewLaunchedContract],
    async (url) => {
      return apiClient(`${url}`).then((res) => {
        return res.data
      })
    }
  )
  return { data, error }
}

export default useProject