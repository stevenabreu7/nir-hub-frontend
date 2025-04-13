<template>
  <div class="model-details">
    <div v-if="loading" class="loading-indicator">
      <p>Loading model details...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <router-link to="/" class="btn-secondary">Back to Models</router-link>
    </div>
    
    <div v-else-if="model" class="model-content">
      <div class="model-header">
        <div class="back-link">
          <router-link to="/" class="btn-secondary">
            ← Back to Models
          </router-link>
        </div>
        
        <h1>{{ model.model_name }}</h1>
        
        <div class="model-meta">
          <div class="meta-item">
            <span class="label">NIR Version:</span>
            <span class="value">{{ model.nir_version }}</span>
          </div>
          
          <div v-if="model.framework_origin" class="meta-item">
            <span class="label">Framework:</span>
            <span class="value">{{ model.framework_origin }}</span>
          </div>
          
          <div v-if="model.owner" class="meta-item">
            <span class="label">Owner:</span>
            <router-link :to="`/user/${model.owner}`" class="value link">
              {{ model.owner }}
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="model-description card">
        <h2>Description</h2>
        <p v-if="model.description">{{ model.description }}</p>
        <p v-else class="no-desc">No description provided</p>
        
        <div v-if="model.tags && model.tags.length > 0" class="model-tags">
          <h3>Tags:</h3>
          <div class="tags">
            <span 
              v-for="tag in model.tags" 
              :key="tag" 
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <div v-if="model.compatible_platforms && model.compatible_platforms.length > 0" class="model-platforms">
          <h3>Compatible Platforms:</h3>
          <div class="platforms">
            <span 
              v-for="platform in model.compatible_platforms" 
              :key="platform" 
              class="platform"
            >
              {{ platform }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="model-files card">
        <h2>Files</h2>
        
        <div class="file-list">
          <div class="file-item nir-file">
            <div class="file-info">
              <span class="file-name">{{ model.model_name }}.nir</span>
              <span class="file-type">NIR Model File</span>
            </div>
            
            <button @click="downloadModel" class="btn">
              Download Model
            </button>
          </div>
          
          <div class="file-item json-file">
            <div class="file-info">
              <span class="file-name">config.json</span>
              <span class="file-type">Configuration</span>
            </div>
            
            <button @click="showConfigFile" class="btn-secondary">
              View Config
            </button>
          </div>
          
          <!-- Placeholder for additional files (in a real app, you'd fetch these) -->
          <p v-if="additionalFiles.length === 0" class="no-additional-files">
            No additional files available.
          </p>
          
          <div 
            v-for="file in additionalFiles" 
            :key="file.name"
            class="file-item"
          >
            <div class="file-info">
              <span class="file-name">{{ file.name }}</span>
              <span class="file-type">{{ file.type }}</span>
            </div>
            
            <button @click="viewFile(file)" class="btn-secondary">
              View File
            </button>
          </div>
        </div>
      </div>
      
      <!-- File viewer modal -->
      <div v-if="viewingFile" class="file-viewer-overlay" @click="closeFileViewer">
        <div class="file-viewer-modal" @click.stop>
          <div class="file-viewer-header">
            <h3>{{ viewingFileName }}</h3>
            <button @click="closeFileViewer" class="close-btn">×</button>
          </div>
          <div class="file-viewer-content">
            <FileViewer 
              :fileName="viewingFileName"
              :fileContent="viewingFileContent"
              :isDownloadable="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import FileViewer from '../components/FileViewer.vue'

export default {
  components: {
    FileViewer
  },
  
  props: {
    id: {
      type: String,
      required: true
    }
  },
  
  setup(props) {
    const model = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const additionalFiles = ref([])
    
    // File viewer state
    const viewingFile = ref(false)
    const viewingFileName = ref('')
    const viewingFileContent = ref('')
    
    // Fetch model details
    const fetchModel = async () => {
      loading.value = true
      error.value = null
      
      try {
        const response = await api.getModel(props.id)
        model.value = response.data
        
        // In a real app, you might fetch a list of additional files here
        // For now, we'll just use the config file as an example
        additionalFiles.value = []
        
      } catch (err) {
        console.error('Failed to fetch model:', err)
        error.value = 'Failed to load model details. Please try again.'
      } finally {
        loading.value = false
      }
    }
    
    // Download the model file
    const downloadModel = async () => {
      try {
        const response = await api.getModelDownloadUrl(props.id)
        
        if (response.data && response.data.redirect) {
          window.open(response.data.redirect, '_blank')
        } else {
          alert('Download link not available.')
        }
      } catch (err) {
        console.error('Failed to get download URL:', err)
        alert('Failed to generate download link. Please try again.')
      }
    }
    
    // Show the config file in the viewer
    const showConfigFile = () => {
      viewingFileName.value = 'config.json'
      viewingFileContent.value = JSON.stringify(model.value, null, 2)
      viewingFile.value = true
    }
    
    // View any file (would fetch the content in a real app)
    const viewFile = (file) => {
      viewingFileName.value = file.name
      viewingFileContent.value = 'File content would be loaded here in a real application.'
      viewingFile.value = true
    }
    
    // Close the file viewer
    const closeFileViewer = () => {
      viewingFile.value = false
    }
    
    onMounted(() => {
      fetchModel()
    })
    
    return {
      model,
      loading,
      error,
      additionalFiles,
      viewingFile,
      viewingFileName,
      viewingFileContent,
      downloadModel,
      showConfigFile,
      viewFile,
      closeFileViewer
    }
  }
}
</script>

<style scoped>
.model-header {
  margin-bottom: 2rem;
}

.back-link {
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.model-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  gap: 0.5rem;
}

.meta-item .label {
  font-weight: 500;
  color: #666;
}

.meta-item .link {
  color: var(--primary-color);
  text-decoration: none;
}

.meta-item .link:hover {
  text-decoration: underline;
}

.card {
  margin-bottom: 2rem;
}

.model-description h2,
.model-files h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.no-desc {
  color: #999;
  font-style: italic;
}

.model-tags,
.model-platforms {
  margin-top: 1.5rem;
}

.model-tags h3,
.model-platforms h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.platform {
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  font-size: 0.9rem;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--background-color);
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

.file-info {
  display: flex;
  flex-direction: column;
}

.file-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.file-type {
  font-size: 0.85rem;
  color: #666;
}

.no-additional-files {
  color: #666;
  font-style: italic;
  padding: 1rem;
  text-align: center;
}

/* File viewer modal */
.file-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.file-viewer-modal {
  background-color: var(--card-background);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.file-viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.file-viewer-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.file-viewer-content {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}

@media (prefers-color-scheme: dark) {
  .platform {
    background-color: #2a2a2a;
    color: #f0f0f0;
  }
}
</style>