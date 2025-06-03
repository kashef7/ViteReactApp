import { useState } from 'react'
import './css/App.css'
import LoginPage from './Pages/LoginPage.jsx'
import Home from './Pages/Home.jsx';
import NavBar from './components/NavBar.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path = "/" element = {<Home></Home>}></Route>
        <Route path = "/Home" element = {<Home></Home>}></Route>
        <Route path = "/login" element = {<LoginPage></LoginPage>}></Route>
      </Routes>
    </Router>
  )
}

export default App
