import axios from 'axios'
import { mockModels } from './mockData'

// Configuration settings
const USE_MOCK_DATA = true

// In development, use relative URLs which will be handled by the Vite proxy
// In production, use the absolute Firebase URL
const isDevelopment = import.meta.env.MODE === 'development'
const API_URL = isDevelopment ? '' : 'https://nir-hub-042025.web.app'

// Create API client
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Helper to handle API errors consistently
const handleApiError = (error, mockResponse) => {
  console.error('API Error:', error)
  
  // If using mock data is enabled or we encounter CORS, fall back to mock data
  if (USE_MOCK_DATA || (error.message && error.message.includes('CORS'))) {
    console.log('Falling back to mock data')
    return Promise.resolve(mockResponse)
  }
  
  // Otherwise propagate the error
  return Promise.reject(error)
}

const api = {
  // Get all models
  async getModels() {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for getModels')
      return { data: mockModels }
    }
    
    try {
      return await apiClient.get('/api/models')
    } catch (error) {
      return handleApiError(error, { data: mockModels })
    }
  },
  
  // Get a specific model by ID or name
  async getModel(id) {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for getModel')
      const model = mockModels.find(model => model.model_id === id)
      return { data: model || null }
    }
    
    try {
      return await apiClient.get(`/api/models/${id}`)
    } catch (error) {
      const model = mockModels.find(model => model.model_id === id)
      return handleApiError(error, { data: model || null })
    }
  },
  
  // Search models by criteria
  async searchModels(params) {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for searchModels')
      return { data: filterMockModels(params) }
    }
    
    try {
      return await apiClient.get('/api/models/search', { params })
    } catch (error) {
      return handleApiError(error, { data: filterMockModels(params) })
    }
  },
  
  // Get a download URL for a model
  async getModelDownloadUrl(id) {
    if (USE_MOCK_DATA) {
      console.log('Using mock data for getModelDownloadUrl')
      return { data: { redirect: '#mock-download-link' } }
    }
    
    try {
      return await apiClient.get(`/api/models/${id}/download`)
    } catch (error) {
      return handleApiError(error, { data: { redirect: '#mock-download-link' } })
    }
  }
}

// Helper function to filter mock models based on search criteria
function filterMockModels(params) {
  let results = [...mockModels]
  
  if (params.tag) {
    results = results.filter(model => model.tags && model.tags.includes(params.tag))
  }
  
  if (params.framework) {
    results = results.filter(model => model.framework_origin === params.framework)
  }
  
  if (params.platform) {
    results = results.filter(model => 
      model.compatible_platforms && model.compatible_platforms.includes(params.platform)
    )
  }
  
  return results
}

export default api