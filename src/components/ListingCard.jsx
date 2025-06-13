import React from 'react';
import { Link } from 'react-router-dom';

function ListingCard({ id, title, category, platform, price, condition, canDelete, onDelete, canEdit }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{category} · {platform}</h6>
        <p className="card-text">
          <strong>Condition:</strong> {condition}<br />
          <strong>Price:</strong> {price} CZK
        </p>

        {/* ✅ Use 'id' directly here */}
        <Link to={`/listing/${id}`} className="btn btn-primary btn-sm">
          View Listing
        </Link>

        {canDelete && (
          <button className='btn btn-danger btn-sm ms-2' onClick={() => onDelete(id)}>
            Delete
          </button>
        )}

        {canEdit && (
          <Link to={`/listing/${id}/edit`} className='btn btn-success btn-sm ms-2'>
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}

export default ListingCard;
