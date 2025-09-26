import axios from 'axios'
export function createHttp(baseURL: string) {
  const instance = axios.create({ baseURL, timeout: 10000 })
  instance.interceptors.request.use((config) => {
    config.headers['X-Server-Request'] = 'true'
    return config
  }, (error) => Promise.reject(error))
  instance.interceptors.response.use((res) => res, (error) => {
    console.error('Server axios error:', error?.response?.status, error?.message)
    return Promise.reject(error)
  })
  return instance
}
