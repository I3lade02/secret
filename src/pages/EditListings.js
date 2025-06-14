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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/listings/${id}`, formData, {
        headers: { Authorization: token }
      });
      alert('Listing updated');
      navigate(`/listing/${id}`);
    } catch (err) {
      console.error('Error updating listing:', err);
      alert('Failed to update listing');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Listing</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="mb-3">
            <label className="form-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              className="form-control form-control-sm"
              type={key === 'price' ? 'number' : 'text'}
              required
              min={key === 'price' ? '0' : undefined}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}