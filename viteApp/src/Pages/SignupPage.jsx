import '../css/LoginPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext.jsx';

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const signup = async (name, email, password, confirmPassword) => {
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
  const res = await fetch('https://sharesappbackend-production.up.railway.app/api/v1/users/signUp', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });
      if (!res.ok) throw new Error('Signup failed');
      await res.json();
      // Fetch user info after signup
  const userRes = await fetch('https://sharesappbackend-production.up.railway.app/api/v1/users/me', {
        credentials: 'include'
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.data.user);
        navigate('/');
      }
    } catch (err) {
      setError('Signup failed. Try again.');
    }
  };

  return (
    <div className='LoginPageBody'>
      <div className='loginBox'>
        <input type='text' placeholder='Name' className='usernameInput' onChange={val => setName(val.target.value)} />
        <input type='text' placeholder='Email' className='usernameInput' onChange={val => setEmail(val.target.value)} />
        <input type='password' placeholder='Password' className='passwordInput' onChange={val => setPassword(val.target.value)} />
        <input type='password' placeholder='Confirm Password' className='passwordInput' onChange={val => setConfirmPassword(val.target.value)} />
        <button className='loginButton' onClick={() => signup(name, email, password, confirmPassword)}>Sign Up</button>
        {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
      </div>
    </div>
  );
}
