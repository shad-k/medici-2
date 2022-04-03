import axios from 'axios'
import { API_ENDPOINT } from './config'

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
})

export default apiClient
