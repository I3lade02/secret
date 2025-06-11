// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = res.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Update context
      setUser(user);

      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
