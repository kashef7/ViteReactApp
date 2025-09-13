import './css/App.css'
import LoginPage from './Pages/LoginPage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import Home from './Pages/Home.jsx';
import NavBar from './components/NavBar.jsx'
import Likes from './components/Likes.jsx';
import Comments from './components/Comments.jsx';
import Profile from './Pages/Profile.jsx';
import { useUser } from './components/UserContext.jsx';
import { Routes, Route , useLocation } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const location = useLocation();
  const state = location.state;
  const { user } = useUser();
  return (
    <div>
      <NavBar></NavBar>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<ProtectedRoute><Home loggedInUserId={user?._id} /></ProtectedRoute>} />
        <Route path="/Home" element={<ProtectedRoute><Home loggedInUserId={user?._id} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      {state?.backgroundLocation &&
      <Routes>
        <Route path='/likes' element={<ProtectedRoute><Likes /></ProtectedRoute>} />
        <Route path='/comments' element={<ProtectedRoute><Comments /></ProtectedRoute>} />
      </Routes>
      }
    </div>
  )
}

export default App
