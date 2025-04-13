<template>
  <div class="search-section">
    <div class="search-filters">
      <div class="search-input">
        <input 
          type="text" 
          v-model="searchQuery"
          placeholder="Search models..."
          @input="emitSearch"
        />
      </div>
      
      <div class="filter-group">
        <label>Tags:</label>
        <select v-model="selectedTag" @change="emitSearch">
          <option value="">All Tags</option>
          <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Framework:</label>
        <select v-model="selectedFramework" @change="emitSearch">
          <option value="">All Frameworks</option>
          <option v-for="fw in availableFrameworks" :key="fw" :value="fw">{{ fw }}</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Platform:</label>
        <select v-model="selectedPlatform" @change="emitSearch">
          <option value="">All Platforms</option>
          <option v-for="platform in availablePlatforms" :key="platform" :value="platform">{{ platform }}</option>
        </select>
      </div>
    </div>
    
    <div class="active-filters" v-if="hasActiveFilters">
      <div class="filter-label">Active filters:</div>
      <div class="filter-tags">
        <span v-if="selectedTag" class="filter-tag">
          Tag: {{ selectedTag }}
          <button @click="clearTag">×</button>
        </span>
        <span v-if="selectedFramework" class="filter-tag">
          Framework: {{ selectedFramework }}
          <button @click="clearFramework">×</button>
        </span>
        <span v-if="selectedPlatform" class="filter-tag">
          Platform: {{ selectedPlatform }}
          <button @click="clearPlatform">×</button>
        </span>
        <span v-if="searchQuery" class="filter-tag">
          "{{ searchQuery }}"
          <button @click="clearSearch">×</button>
        </span>
      </div>
      <button class="clear-all" @click="clearAll">Clear all filters</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  props: {
    availableTags: {
      type: Array,
      default: () => []
    },
    availableFrameworks: {
      type: Array,
      default: () => []
    },
    availablePlatforms: {
      type: Array,
      default: () => []
    }
  },
  
  emits: ['search'],
  
  setup(props, { emit }) {
    const searchQuery = ref('')
    const selectedTag = ref('')
    const selectedFramework = ref('')
    const selectedPlatform = ref('')
    
    const hasActiveFilters = computed(() => {
      return searchQuery.value || selectedTag.value || selectedFramework.value || selectedPlatform.value
    })
    
    const emitSearch = () => {
      emit('search', {
        query: searchQuery.value,
        tag: selectedTag.value,
        framework: selectedFramework.value,
        platform: selectedPlatform.value
      })
    }
    
    const clearTag = () => {
      selectedTag.value = ''
      emitSearch()
    }
    
    const clearFramework = () => {
      selectedFramework.value = ''
      emitSearch()
    }
    
    const clearPlatform = () => {
      selectedPlatform.value = ''
      emitSearch()
    }
    
    const clearSearch = () => {
      searchQuery.value = ''
      emitSearch()
    }
    
    const clearAll = () => {
      searchQuery.value = ''
      selectedTag.value = ''
      selectedFramework.value = ''
      selectedPlatform.value = ''
      emitSearch()
    }
    
    return {
      searchQuery,
      selectedTag,
      selectedFramework,
      selectedPlatform,
      hasActiveFilters,
      emitSearch,
      clearTag,
      clearFramework,
      clearPlatform,
      clearSearch,
      clearAll
    }
  }
}
</script>

<style scoped>
.search-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.search-input input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: var(--background-color);
  color: var(--text-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-group label {
  font-size: 0.8rem;
  color: #666;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: var(--background-color);
  color: var(--text-color);
}

.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.filter-label {
  font-size: 0.85rem;
  color: #666;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #f0f0f0;
  color: #333;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.filter-tag button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  color: #888;
}

.filter-tag button:hover {
  color: #333;
}

.clear-all {
  margin-left: auto;
  background: none;
  border: none;
  color: #888;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
}

.clear-all:hover {
  color: #333;
}

@media (prefers-color-scheme: dark) {
  .filter-tag {
    background-color: #2a2a2a;
    color: #f0f0f0;
  }
  
  .filter-tag button:hover {
    color: #f0f0f0;
  }
  
  .clear-all:hover {
    color: #f0f0f0;
  }
}
</style>