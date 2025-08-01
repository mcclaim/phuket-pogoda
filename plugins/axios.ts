import axios from 'axios'
export default defineNuxtPlugin(() => {
  const instance = axios.create({ baseURL: '/api', timeout: 10000 })
  instance.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  }, (error) => Promise.reject(error))
  instance.interceptors.response.use((r) => r, (error) => {
    console.error('Axios error:', error?.response?.status, error?.message)
    return Promise.reject(error)
  })
  return { provide: { axios: instance } }
})
