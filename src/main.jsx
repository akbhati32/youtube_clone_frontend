import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { BrowserRouter } from "react-router-dom"

// Create React root and render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provide Redux store to the entire app */}
    <Provider store={store}>
      {/* Enable client-side routing */}
      <BrowserRouter>
        {/* Root application component */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
