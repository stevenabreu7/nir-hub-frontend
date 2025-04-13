<template>
  <header>
    <div class="container">
      <nav>
        <router-link to="/" class="logo">
          <img :src="isDarkMode ? 'images/logo_light.png' : 'images/logo_dark.png'" alt="NIR Hub Logo" />
        </router-link>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
        </div>
      </nav>
    </div>
  </header>
  
  <main class="container">
    <router-view />
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} NIR Project | <a href="https://neuroir.org" target="_blank">neuroir.org</a></p>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const isDarkMode = ref(false)
    
    onMounted(() => {
      // Check for user's color scheme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDarkMode.value = mediaQuery.matches
      
      // Listen for changes in the color scheme
      mediaQuery.addEventListener('change', (e) => {
        isDarkMode.value = e.matches
      })
    })
    
    return {
      isDarkMode
    }
  }
}
</script>

<style>
header {
  background-color: var(--card-background);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  padding: 1rem 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--primary-color);
}

footer {
  background-color: var(--card-background);
  margin-top: 2rem;
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

footer a {
  color: var(--primary-color);
  text-decoration: none;
}

main {
  min-height: calc(100vh - 160px);
}
</style>