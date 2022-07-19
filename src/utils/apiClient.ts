import axios from 'axios'
import { API_ENDPOINT } from './config'

const apiClient = axios.create({
  baseURL: API_ENDPOINT
})

export default apiClient
