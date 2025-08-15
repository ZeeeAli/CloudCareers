import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'

// Declare the global variable for TypeScript
declare const __BASE_PATH__: string;

function App() {
  // Provide a fallback value if __BASE_PATH__ is not defined
  const basePath = typeof __BASE_PATH__ !== 'undefined' ? __BASE_PATH__ : '/';

  return (
    <BrowserRouter basename={basePath}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App