// DoctorLogin.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css'; 

function DoctorLogin({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    
    fetch('/doctor_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        localStorage.setItem('token', data.access_token); 
        login(data);
        setAuth(true);
        history.push('/');
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Doctor Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default DoctorLogin;
