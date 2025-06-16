import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();
  const { showAlert } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showAlert('danger', 'Passwords do not match');
      return;
    }
    
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      showAlert('success', 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      showAlert('danger', 'Failed to register');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            type="text"
            className="form-control form-control-sm"
            placeholder="Gamer123"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control form-control-sm"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control form-control-sm"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='mb-3'>
          <label className='form-label'>Confirm password</label>
          <input 
            type='password'
            className='form-control'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;