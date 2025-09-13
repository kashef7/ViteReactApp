import  '../css/LoginPage.css';
import { useState } from 'react';
import { useUser } from '../components/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function LoginPage(){
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const login = async (email, password) =>{
  const res = await fetch('https://sharesappbackend-production.up.railway.app/api/v1/users/login',{
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,password})
    });
    if (!res.ok) throw new Error("Login failed");
    await res.json();
    // Fetch user info after login
  const userRes = await fetch('https://sharesappbackend-production.up.railway.app/api/v1/users/me', {
      credentials: 'include'
    });
    if (userRes.ok) {
      const userData = await userRes.json();
      setUser(userData.data.user);
      navigate("/")
    }
  };


  return (
    <div className='LoginPageBody'>
      <div className='loginBox'>
        <input type='text' placeholder='Email' className='usernameInput' onChange={val => setEmail(val.target.value)}></input>
        <input type='password' placeholder='Password' className='passwordInput'onChange={val => setPassword(val.target.value)}></input>
        <button className='loginButton' onClick={() => login(email,password)}>Login</button>
        <div style={{marginTop: '12px'}}>
          <a href='/signup' style={{color: '#C0C3D9', textDecoration: 'underline', cursor: 'pointer'}}>Create account</a>
        </div>
      </div>
    </div>
  );
};

