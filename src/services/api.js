import axios from 'axios'

// Use Firebase Functions URL (can be changed in production)
const API_URL = 'https://nir-hub-042025.web.app'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  // Get all models
  getModels() {
    return apiClient.get('/api/models')
  },
  
  // Get a specific model by ID or name
  getModel(id) {
    return apiClient.get(`/api/models/${id}`)
  },
  
  // Search models by criteria
  searchModels(params) {
    return apiClient.get('/api/models/search', { params })
  },
  
  // Get a download URL for a model
  getModelDownloadUrl(id) {
    return apiClient.get(`/api/models/${id}/download`)
  }
}