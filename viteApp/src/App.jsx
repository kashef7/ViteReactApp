import './css/App.css'
import LoginPage from './Pages/LoginPage.jsx'
import Home from './Pages/Home.jsx';
import NavBar from './components/NavBar.jsx'
import Likes from './components/Likes.jsx';
import Comments from './components/Comments.jsx';
import Profile from './Pages/Profile.jsx';
import { Routes, Route , useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const state = location.state;
  return (
    <div>
      <NavBar></NavBar>
      <Routes location={state?.backgroundLocation || location}>
        <Route path = "/" element = {<Home></Home>}></Route>
        <Route path = "/Home" element = {<Home></Home>}></Route>
        <Route path = "/login" element = {<LoginPage></LoginPage>}></Route>
        <Route path = "/profile" element = {<Profile></Profile>}></Route>
      </Routes>
      {state?.backgroundLocation &&
      <Routes>
        <Route path = '/likes' element = {<Likes></Likes>}></Route>
        <Route path = '/comments' element = {<Comments></Comments>}></Route>
      </Routes>
      }
    </div>
  )
}

export default App
