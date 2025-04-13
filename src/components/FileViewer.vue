<template>
  <div class="file-viewer">
    <div class="file-header">
      <h3>{{ fileName }}</h3>
      <div class="file-actions" v-if="isDownloadable">
        <button @click="downloadFile" class="btn-secondary">Download</button>
      </div>
    </div>
    
    <div class="file-content">
      <!-- JSON Viewer -->
      <div v-if="fileType === 'json'" class="json-view">
        <pre>{{ formattedContent }}</pre>
      </div>
      
      <!-- Markdown Viewer -->
      <div v-else-if="fileType === 'md'" class="markdown-view" v-html="renderedMarkdown"></div>
      
      <!-- Text/Code Viewer -->
      <div v-else class="text-view">
        <pre>{{ fileContent }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { marked } from 'marked'

export default {
  props: {
    fileName: {
      type: String,
      required: true
    },
    fileContent: {
      type: String,
      required: true
    },
    isDownloadable: {
      type: Boolean,
      default: false
    },
    downloadUrl: {
      type: String,
      default: ''
    }
  },
  
  setup(props) {
    const fileType = computed(() => {
      const extension = props.fileName.split('.').pop().toLowerCase()
      if (['json'].includes(extension)) return 'json'
      if (['md', 'markdown'].includes(extension)) return 'md'
      return 'text'
    })
    
    const formattedContent = computed(() => {
      if (fileType.value === 'json') {
        try {
          return JSON.stringify(JSON.parse(props.fileContent), null, 2)
        } catch (e) {
          return props.fileContent
        }
      }
      return props.fileContent
    })
    
    const renderedMarkdown = computed(() => {
      if (fileType.value === 'md') {
        return marked(props.fileContent)
      }
      return ''
    })
    
    const downloadFile = () => {
      if (props.downloadUrl) {
        window.open(props.downloadUrl, '_blank')
      } else {
        // Create a blob and download it directly
        const blob = new Blob([props.fileContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = props.fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    }
    
    return {
      fileType,
      formattedContent,
      renderedMarkdown,
      downloadFile
    }
  }
}
</script>

<style scoped>
.file-viewer {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--card-background);
}

.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

.file-header h3 {
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

.file-content {
  padding: 1rem;
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
}

.file-content pre {
  margin: 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
}

.json-view pre {
  color: #333;
}

.markdown-view {
  font-size: 0.95rem;
  line-height: 1.6;
}

.markdown-view h1 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.markdown-view h2 {
  font-size: 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-view h3 {
  font-size: 1.1rem;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
}

.markdown-view p {
  margin-bottom: 1rem;
}

.markdown-view ul, .markdown-view ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-view img {
  max-width: 100%;
  height: auto;
}

.markdown-view code {
  font-family: 'Fira Code', 'Consolas', monospace;
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.85rem;
}

.markdown-view pre code {
  display: block;
  padding: 1rem;
  overflow-x: auto;
  background-color: #f5f5f5;
  border-radius: 4px;
}

@media (prefers-color-scheme: dark) {
  .json-view pre {
    color: #f0f0f0;
  }
  
  .markdown-view code {
    background-color: #2a2a2a;
  }
  
  .markdown-view pre code {
    background-color: #2a2a2a;
  }
}
</style>