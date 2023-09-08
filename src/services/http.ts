import axios from 'axios'

const configAxios = {
  baseURL: import.meta.env.VITE_API_URL_BASE,
  headers: {
    'Content-type': 'application/json'
  }
}

const axiosInstance = axios.create(configAxios)

export default axiosInstance
