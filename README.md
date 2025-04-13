# NIR Hub Frontend

A modern, lightweight frontend for the NIR (Neural Interface Representation) model repository. This application provides a clean interface for browsing, searching, and exploring NIR models.

**Live Demo:** [https://stevenabreu7.github.io/nir-hub-frontend/](https://stevenabreu7.github.io/nir-hub-frontend/)

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
git clone https://github.com/stevenabreu7/nir-hub-frontend.git
cd nir-hub-frontend
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

### Mock Data vs Real Data

You can configure whether to use mock data or real data from the API:

1. In `src/services/api.js`, set `USE_MOCK_DATA` to:
   - `true` to always use mock data
   - `false` to attempt to use real data from the API (falls back to mock data on errors)

The API server requires CORS configuration to accept requests from your frontend domain. A sample implementation with CORS support is provided in the `/NIR-hub-v2/functions/main_with_cors.py` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NIR Project (https://neuroir.org)
- Vue.js
- PrimeVue