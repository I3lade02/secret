import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'

export default function ListingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    platform: '',
    condition: '',
    price: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { showAlert } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = '';

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await axios.post('http://localhost:5000/api/upload', uploadData);
        uploadedImageUrl = uploadRes.data.imageUrl;
      }

      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/listings',
        { ...formData, image: uploadedImageUrl },
        { headers: { Authorization: token } }
      );

      showAlert('success', 'Listing created');
      navigate(`/listing/${res.data._id}`);
    } catch (err) {
      console.error('Error creating listing: ', err);
      showAlert('danger', 'Failed to create listing');
    }
  };

  return (
    <div className='container mt-4'>
      <h2>Create new listing</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        {['title', 'category', 'platform', 'condition', 'price'].map((field) => (
          <div key={field} className='mb-3'>
            <label className='form-label'>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input 
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>
        ))}

        {/* Image upload */}
        <div className='mb-3'>
          <label className='form-label'>Image</label>
          <input type='file' accept='image/*' onChange={handleImageChange} className='form-control' />
          {previewUrl && <img src={previewUrl} alt='Preview' className='img-fluid mt-2' style={{ maxWidth: '200px' }} />}
        </div>

        <button type='submit' className='btn btn-success'>Submit listing</button>
      </form>
    </div>
  );
}