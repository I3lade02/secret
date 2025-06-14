import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingCard({ id, title, category, platform, price, condition, canDelete, onDelete}) {
  return (
    <div className='card mb-4 shadow-sm border-0 hover-shadow'>
      <div className='row g-0'>
        <div className='col-md-3 d-flex align-items-center justify-content-center bg-light'>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#ddd', borderRadius: '0.5rem'}}></div>
        </div>

        <div className='col-md-9'>
          <div className='card-body'>
            <h5 className='card-title mb-1'>{title}</h5>
            <span className='badge bg-primary mb-2'>{category}</span>

            <p className='card-text small mb-2'>
              🎮 {platform} &nbsp; . &nbsp; 🛠 {condition}
            </p>

            <div className='d-flex justify-content-between align-items-center'>
              <span className='fw-bold text-success'>💰 {price} CZK</span>

              <div>
                <Link to={`/listing/${id}`} className='btn btn-sm btn-outline-primary me-2'>
                  View
                </Link>

                {canDelete && (
                  <button className='btn btn-sm btn-outline-danger' onClick={() => onDelete(id)}>
                    Delete
                  </button>
                )}

                <Link to={`/listing/${id}`} className='btn btn-outline-success btn-sm ms-2'>
                  Edit
                </Link>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}