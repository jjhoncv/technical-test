import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BASE,
  headers: {
    'Content-type': 'application/json'
  }
})

export default axiosInstance
