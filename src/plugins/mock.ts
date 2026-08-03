/**
 * Mock Plugin
 * Provides a centralized way to manage mock data and toggle between mock and real API calls.
 */
import { getMockBanner, getMockArticles, mockFooterPicData, mockMailAlertsResponse, mockDelAlertEmailResponse, mockCommitteePosition, mockKlineData, mockNavData } from '@/mock'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Common mock response wrapper
function mockResponse<T>(data: T): Promise<{ data: T; status: number; statusText: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data,
        status: 200,
        statusText: 'OK'
      })
    }, 200)
  })
}

// Mock API implementations
export const mockApi = {
  getNav: () => mockResponse(mockNavData),
  
  getBanner: (params: { selectedNav?: string } = {}) => {
    const bannerData = getMockBanner(params.selectedNav || '')
    return mockResponse(bannerData)
  },
  
  getArticle: (params: { nav_no?: string } = {}) => {
    const articles = getMockArticles(params.nav_no || '')
    return mockResponse(articles)
  },
  
  getFooterPic: () => mockResponse(mockFooterPicData),
  
  getCommitteePosition: () => mockResponse(mockCommitteePosition),
  
  mailAlerts: (_data: any) => mockResponse(mockMailAlertsResponse),
  
  deleteAlertEmail: (_data: any) => mockResponse(mockDelAlertEmailResponse),
  
  getKline: (_type: string) => {
    const klineData = {
      data: {
        'usDEMO.OQ': mockKlineData.data['usDEMO.OQ']
      }
    }
    return mockResponse(klineData)
  }
}

// Real API implementations (to be connected later)
export const realApi = {
  getNav: () => import('@/plugins/request').then(m => m.request.get('/nav')),
  
  getBanner: (params: { selectedNav?: string }) => 
    import('@/plugins/request').then(m => m.request.get('/banner', params)),
  
  getArticle: (params: { nav_no?: string }) => 
    import('@/plugins/request').then(m => m.request.get('/article', params)),
  
  getFooterPic: () => 
    import('@/plugins/request').then(m => m.request.get('/footer/pic')),
  
  getCommitteePosition: () => 
    import('@/plugins/request').then(m => m.request.get('/committee/position')),
  
  mailAlerts: (data: any) => 
    import('@/plugins/request').then(m => m.request.post('/mail/alerts', data)),
  
  deleteAlertEmail: (data: any) => 
    import('@/plugins/request').then(m => m.request.post('/mail/alerts/delete', data)),
  
  getKline: (type: string) => 
    import('@/plugins/request').then(m => m.request.get('/kline', { type }))
}

// Unified API with mock/real toggle
export const api = USE_MOCK ? mockApi : realApi

// Re-export individual functions for convenience
export function getNav() {
  return USE_MOCK ? mockApi.getNav() : realApi.getNav()
}

export function getBanner(params?: { selectedNav?: string }) {
  return USE_MOCK ? mockApi.getBanner(params) : realApi.getBanner(params || {})
}

export function getArticle(params?: { nav_no?: string }) {
  return USE_MOCK ? mockApi.getArticle(params) : realApi.getArticle(params || {})
}

export function getFooterPic() {
  return USE_MOCK ? mockApi.getFooterPic() : realApi.getFooterPic()
}

export function getCommitteePosition() {
  return USE_MOCK ? mockApi.getCommitteePosition() : realApi.getCommitteePosition()
}

export function mailAlerts(data?: any) {
  return USE_MOCK ? mockApi.mailAlerts(data) : realApi.mailAlerts(data || {})
}

export function deleteAlertEmail(data?: any) {
  return USE_MOCK ? mockApi.deleteAlertEmail(data) : realApi.deleteAlertEmail(data || {})
}

export function getKline(type: string) {
  return USE_MOCK ? mockApi.getKline(type) : realApi.getKline(type)
}

export const MockPlugin = {
  install(app: any) {
    app.config.globalProperties.$api = api
    app.provide('$api', api)
    app.provide('USE_MOCK', USE_MOCK)
  }
}

export default { api, USE_MOCK }
