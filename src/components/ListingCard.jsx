import React from 'react';
import { Link } from 'react-router-dom';

function ListingCard({ id, title, category, platform, price, condition }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{category} · {platform}</h6>
        <p className="card-text">
          <strong>Condition:</strong> {condition}<br />
          <strong>Price:</strong> ${price}
        </p>
        <Link to={`/listing/${id}`} className="btn btn-primary btn-sm">View Listing</Link>
      </div>
    </div>
  );
}

export default ListingCard;
