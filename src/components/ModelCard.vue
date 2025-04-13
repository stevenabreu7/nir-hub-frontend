<template>
  <div class="card model-card">
    <h3>{{ model.model_name }}</h3>
    
    <div class="model-meta">
      <span class="version">NIR v{{ model.nir_version }}</span>
      <span v-if="model.framework_origin" class="origin">{{ model.framework_origin }}</span>
    </div>
    
    <p v-if="model.description" class="description">{{ model.description }}</p>
    <p v-else class="description no-desc">No description provided</p>
    
    <div class="tags" v-if="model.tags && model.tags.length > 0">
      <span class="tag" v-for="tag in model.tags" :key="tag">{{ tag }}</span>
    </div>
    
    <div class="compatible" v-if="model.compatible_platforms && model.compatible_platforms.length > 0">
      <h4>Compatible with:</h4>
      <div class="platforms">
        <span class="platform" v-for="platform in model.compatible_platforms" :key="platform">{{ platform }}</span>
      </div>
    </div>
    
    <div class="model-footer">
      <router-link :to="`/model/${model.model_id}`" class="btn">View Details</router-link>
      <span v-if="model.owner" class="owner">
        by 
        <router-link :to="`/user/${model.owner}`">{{ model.owner }}</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.model-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.model-meta {
  display: flex;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.description {
  flex-grow: 1;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.no-desc {
  color: #999;
  font-style: italic;
}

.tags {
  margin-bottom: 1rem;
}

.compatible {
  margin-bottom: 1rem;
}

.compatible h4 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
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
  padding: 0.15rem 0.5rem;
  font-size: 0.8rem;
}

.model-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
}

.owner {
  font-size: 0.85rem;
  color: #666;
}

.owner a {
  color: var(--primary-color);
  text-decoration: none;
}

.owner a:hover {
  text-decoration: underline;
}
</style>