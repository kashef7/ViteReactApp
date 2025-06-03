import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics></Analytics>
    <Router>
      <App/>
    </Router>
  </StrictMode>,
)
