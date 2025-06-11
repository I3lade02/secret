// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });

      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Register failed:', err);
      alert('Registration failed. Try again.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text" className="form-control" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}

export default Register;
