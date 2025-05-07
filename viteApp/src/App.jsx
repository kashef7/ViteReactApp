import { useState } from 'react'
import './css/App.css'
import LoginPage from './Pages/LoginPage.jsx'
import NavBar from './components/NavBar.jsx'


function App() {


  return (
    <div>
      <NavBar></NavBar>
      <LoginPage></LoginPage>
    </div>
  )
}

export default App
