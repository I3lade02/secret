import React from 'react';

function ListingForm() {
  return (
    <form>
      <h2>Create New Listing</h2>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" placeholder="e.g. God of War Ragnarok (PS5)" />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select className="form-select">
          <option>Game Disc</option>
          <option>Digital Code</option>
          <option>Figurine</option>
          <option>Accessory</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Platform</label>
        <select className="form-select">
          <option>PlayStation</option>
          <option>Xbox</option>
          <option>Switch</option>
          <option>PC</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Condition</label>
        <input type="text" className="form-control" placeholder="e.g. Like New, Sealed, Used" />
      </div>

      <div className="mb-3">
        <label className="form-label">Price (CZK)</label>
        <input type="number" className="form-control" placeholder="e.g. 49.99" />
      </div>

      <button type="submit" className="btn btn-success">Submit Listing</button>
    </form>
  );
}

export default ListingForm;
