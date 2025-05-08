import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import './css/index.css'
import NavBar from './components/NavBar.jsx'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics></Analytics>
    <NavBar></NavBar>
    <App/>
  </StrictMode>,
)
