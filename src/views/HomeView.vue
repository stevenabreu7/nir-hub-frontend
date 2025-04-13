<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1>NIR Hub</h1>
        <p>A repository of Neural Interface Representations for neuromorphic computing</p>
      </div>
      <div class="hero-image">
        <img src="/images/nir_platforms.png" alt="NIR Supported Platforms" />
      </div>
    </div>
    
    <SearchFilter 
      :availableTags="availableTags"
      :availableFrameworks="availableFrameworks"
      :availablePlatforms="availablePlatforms"
      @search="handleSearch"
    />
    
    <div v-if="loading" class="loading-indicator">
      <p>Loading models...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchModels" class="btn">Retry</button>
    </div>
    
    <div v-else-if="filteredModels.length === 0" class="no-results">
      <p>No models found matching your search criteria.</p>
      <button @click="clearFilters" class="btn-secondary">Clear Filters</button>
    </div>
    
    <div v-else class="models-grid">
      <ModelCard 
        v-for="model in filteredModels" 
        :key="model.model_id" 
        :model="model"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import SearchFilter from '../components/SearchFilter.vue'
import ModelCard from '../components/ModelCard.vue'
import api from '../services/api'

export default {
  components: {
    SearchFilter,
    ModelCard
  },
  
  setup() {
    const models = ref([])
    const loading = ref(true)
    const error = ref(null)
    const filters = ref({
      query: '',
      tag: '',
      framework: '',
      platform: ''
    })
    
    // List of all available tags, frameworks, and platforms
    const availableTags = computed(() => {
      const tags = new Set()
      models.value.forEach(model => {
        if (model.tags && Array.isArray(model.tags)) {
          model.tags.forEach(tag => tags.add(tag))
        }
      })
      return Array.from(tags).sort()
    })
    
    const availableFrameworks = computed(() => {
      const frameworks = new Set()
      models.value.forEach(model => {
        if (model.framework_origin) {
          frameworks.add(model.framework_origin)
        }
      })
      return Array.from(frameworks).sort()
    })
    
    const availablePlatforms = computed(() => {
      const platforms = new Set()
      models.value.forEach(model => {
        if (model.compatible_platforms && Array.isArray(model.compatible_platforms)) {
          model.compatible_platforms.forEach(platform => platforms.add(platform))
        }
      })
      return Array.from(platforms).sort()
    })
    
    // Filter models based on search criteria
    const filteredModels = computed(() => {
      return models.value.filter(model => {
        // Text search
        if (filters.value.query) {
          const query = filters.value.query.toLowerCase()
          const searchFields = [
            model.model_name,
            model.description,
            model.framework_origin,
            ...(model.tags || [])
          ].filter(Boolean)
          
          const matches = searchFields.some(field => 
            field.toLowerCase().includes(query)
          )
          
          if (!matches) return false
        }
        
        // Tag filter
        if (filters.value.tag && (!model.tags || !model.tags.includes(filters.value.tag))) {
          return false
        }
        
        // Framework filter
        if (filters.value.framework && model.framework_origin !== filters.value.framework) {
          return false
        }
        
        // Platform filter
        if (filters.value.platform && 
            (!model.compatible_platforms || !model.compatible_platforms.includes(filters.value.platform))) {
          return false
        }
        
        return true
      })
    })
    
    // Fetch models from API
    const fetchModels = async () => {
      loading.value = true
      error.value = null
      
      try {
        const response = await api.getModels()
        models.value = response.data
      } catch (err) {
        console.error('Failed to fetch models:', err)
        error.value = 'Failed to load models. Please try again.'
      } finally {
        loading.value = false
      }
    }
    
    // Handle search/filter changes
    const handleSearch = (searchCriteria) => {
      filters.value = searchCriteria
    }
    
    // Clear all filters
    const clearFilters = () => {
      filters.value = {
        query: '',
        tag: '',
        framework: '',
        platform: ''
      }
    }
    
    onMounted(() => {
      fetchModels()
    })
    
    return {
      models,
      loading,
      error,
      filteredModels,
      availableTags,
      availableFrameworks,
      availablePlatforms,
      handleSearch,
      clearFilters,
      fetchModels
    }
  }
}
</script>

<style scoped>
.hero-section {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.hero-content p {
  font-size: 1.1rem;
  color: #666;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  max-width: 100%;
  max-height: 200px;
}

.loading-indicator, .error-message, .no-results {
  text-align: center;
  padding: 2rem;
  background-color: var(--card-background);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.error-message {
  color: #e53935;
}

.no-results {
  color: #666;
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    margin-bottom: 1.5rem;
  }
}
</style>