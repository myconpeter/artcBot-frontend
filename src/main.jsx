import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
