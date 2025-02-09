import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css'; 

function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        localStorage.setItem('token', data.access_token); 
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
    <form onSubmit={handleLogin} className="login-form">
      <h2 className="login-title">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="login-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="login-input"
      />
      <button type="submit" className="login-button">Login</button>
    </form>
  );
}

export default Login;
