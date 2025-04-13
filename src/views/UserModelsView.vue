<template>
  <div class="user-models">
    <div class="back-link">
      <router-link to="/" class="btn-secondary">
        ← Back to All Models
      </router-link>
    </div>
    
    <div class="user-header">
      <div class="user-info">
        <div class="user-avatar">
          <!-- This would be a real avatar in a production app -->
          <div class="avatar-placeholder">
            <span>{{ firstLetter }}</span>
          </div>
        </div>
        <h1>Models by {{ userId }}</h1>
      </div>
    </div>
    
    <div v-if="loading" class="loading-indicator">
      <p>Loading models...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchUserModels" class="btn">Retry</button>
    </div>
    
    <div v-else-if="userModels.length === 0" class="no-models">
      <p>This user hasn't uploaded any models yet.</p>
    </div>
    
    <div v-else>
      <div class="models-grid">
        <ModelCard 
          v-for="model in userModels" 
          :key="model.model_id" 
          :model="model"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import ModelCard from '../components/ModelCard.vue'
import api from '../services/api'

export default {
  components: {
    ModelCard
  },
  
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  
  setup(props) {
    const userModels = ref([])
    const loading = ref(true)
    const error = ref(null)
    
    // Get first letter of user ID for avatar placeholder
    const firstLetter = computed(() => {
      return props.userId.charAt(0).toUpperCase()
    })
    
    // Fetch models by this user
    const fetchUserModels = async () => {
      loading.value = true
      error.value = null
      
      try {
        // Get all models
        const response = await api.getModels()
        const allModels = response.data
        
        // Filter by user ID
        userModels.value = allModels.filter(model => model.owner === props.userId)
      } catch (err) {
        console.error('Failed to fetch user models:', err)
        error.value = 'Failed to load models for this user. Please try again.'
      } finally {
        loading.value = false
      }
    }
    
    onMounted(() => {
      fetchUserModels()
    })
    
    return {
      userModels,
      loading,
      error,
      firstLetter,
      fetchUserModels
    }
  }
}
</script>

<style scoped>
.back-link {
  margin-bottom: 1.5rem;
}

.user-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
}

.user-header h1 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-color);
}

.loading-indicator, .error-message, .no-models {
  text-align: center;
  padding: 2rem;
  background-color: var(--card-background);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.error-message {
  color: #e53935;
}

.no-models {
  color: #666;
  font-style: italic;
}
</style>