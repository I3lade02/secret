import React, { useState } from 'react';

function ListingForm({ onSubmit }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4">📝 Create New Listing</h3>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          name="title"
          type="text"
          className="form-control form-control-sm"
          placeholder="e.g. God of War Ragnarok (PS5)"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          name="category"
          className="form-select form-select-sm"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
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
          className="form-select form-select-sm"
          value={formData.platform}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Platform --</option>
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
          className="form-control form-control-sm"
          placeholder="e.g. Like New, Sealed, Used"
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
          className="form-control form-control-sm"
          placeholder="e.g. 499"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <button type="submit" className="btn btn-success">Submit Listing</button>
    </form>
  );
}

export default ListingForm;
