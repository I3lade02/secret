import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    platform: '',
    condition: '',
    price: ''
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        const { title, category, platform, condition, price } = res.data;
        setFormData({ title, category, platform, condition, price });
      } catch (err) {
        console.error('Error fetching listing:', err);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/listings/${id}`, formData, {
        headers: { Authorization: token }
      });
      alert('Listing updated!');
      navigate(`/listing/${id}`);
    } catch (err) {
      console.error('Error updating listing: ', err);
      alert('Failed to update listing');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Listing</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
