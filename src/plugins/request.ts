import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import type { App } from 'vue'

/**
 * HTTP Request Plugin
 * Provides a centralized HTTP client with axios, including:
 * - Token-based authentication
 * - Error handling
 * - Request/response interceptors
 */

// 扩展 axios 类型，支持自定义属性
declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean
  }
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.skipAuth) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
service.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    return Promise.reject(new Error(response.statusText))
  },
  (error) => {
    handleError(error)
    return Promise.reject(error)
  }
)

function handleError(error: any) {
  if (error.response) {
    const { status } = error.response
    switch (status) {
      case 401:
        localStorage.removeItem('token')
        break
      case 403:
        console.warn('Access denied')
        break
      case 404:
        console.warn('Resource not found')
        break
      case 500:
        console.error('Server error')
        break
      default:
        console.error('Request failed')
    }
  } else {
    console.error('Network error')
  }
}

// Generic request methods
export const request = {
  get<T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config })
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },
  delete<T = any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { params, ...config })
  }
}

// Vue plugin
export const RequestPlugin = {
  install(app: App) {
    app.config.globalProperties.$http = service
    app.provide('$http', service)
    app.provide('$request', request)
  }
}

export default service
