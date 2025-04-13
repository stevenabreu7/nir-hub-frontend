# NIR Hub Frontend

A modern, lightweight frontend for the NIR (Neural Interface Representation) model repository. This application provides a clean interface for browsing, searching, and exploring NIR models.

## Features

- Browse all available NIR models
- Filter models by tags, framework, and compatible platforms
- View detailed model information
- Browse models by user
- View and download model files
- Display file contents (JSON, Markdown) with proper formatting
- Dark/light theme based on system preferences

## Technology Stack

- Vue.js 3 (Composition API)
- Vue Router for navigation
- PrimeVue for UI components
- Axios for API communication
- Vite for build and development tooling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/NIR-hub-frontend.git
cd NIR-hub-frontend
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

The application will be available at `http://localhost:3000`. 
To avoid CORS issues, you can use mock data by setting `const USE_MOCK_DATA = true` in `src/services/api.js`.

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for GitHub Pages deployment through GitHub Actions. Push to the `main` branch to trigger automatic deployment.

For other hosting environments:

1. Update the `base` property in `vite.config.js` if needed
2. Build the project with `npm run build`
3. Deploy the contents of the `dist` folder to your hosting provider

## Configuration

### API Endpoint

The API endpoint is configured in `src/services/api.js`. Update the `API_URL` constant to point to your NIR Hub API server.

### GitHub Pages Base Path

When deploying to GitHub Pages, update the `base` property in `vite.config.js` to match your repository name.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NIR Project (https://neuroir.org)
- Vue.js
- PrimeVue