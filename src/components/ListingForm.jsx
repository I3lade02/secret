import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function ListingForm() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    platform: '',
    condition: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/listings', formData, {
        headers: {
          Authorization: token
        }
      });

      alert('Listing created!');
      navigate('/listings');
    } catch (err) {
      console.error('Failed to create listing:', err);
      alert('Failed to create listing');
    }
  };

  if (!user) return <p className="text-center mt-4">You must be logged in to create a listing.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Listing</h2>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          name="title"
          type="text"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option>Game Disc</option>
          <option>Digital Code</option>
          <option>Figurine</option>
          <option>Accessory</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Platform</label>
        <select
          name="platform"
          className="form-select"
          value={formData.platform}
          onChange={handleChange}
          required
        >
          <option value="">Select platform</option>
          <option>PlayStation</option>
          <option>Xbox</option>
          <option>Switch</option>
          <option>PC</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Condition</label>
        <input
          name="condition"
          type="text"
          className="form-control"
          value={formData.condition}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price (CZK)</label>
        <input
          name="price"
          type="number"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">Submit Listing</button>
    </form>
  );
}

export default ListingForm;
