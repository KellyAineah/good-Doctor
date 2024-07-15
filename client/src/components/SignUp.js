import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Signup.css'; // Ensure to import the CSS file

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, age, gender, phone_number: phoneNumber })
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(({ status, data }) => {
      if (status === 201) {
        history.push('/login');
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    });
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2 className="signup-title">Signup</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="signup-input"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="signup-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="signup-input"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
        className="signup-input"
      />
      <input
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        placeholder="Gender"
        required
        className="signup-input"
      />
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        required
        className="signup-input"
      />
      <button type="submit" className="signup-button">Signup</button>
    </form>
  );
}

export default Signup;
