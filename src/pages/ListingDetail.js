import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error('Error loading listing:', err);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) return <p className="text-center mt-5">Loading listing...</p>;

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card p-4 shadow-sm border-0">
          <div className="row g-4">
            {/* Image Placeholder */}
            <div className="col-md-4 text-center">
              <div
                style={{
                  width: '100%',
                  height: '250px',
                  backgroundColor: '#eee',
                  borderRadius: '0.5rem'
                }}
              ></div>
            </div>

            {/* Listing Info */}
            <div className="col-md-8">
              <h3 className="mb-2">{listing.title}</h3>
              <span className="badge bg-secondary me-2">{listing.category}</span>
              <span className="badge bg-info text-dark">{listing.platform}</span>

              <p className="mt-3">
                <strong>Condition:</strong> {listing.condition}
              </p>

              <p>
                <strong>Price:</strong> 💰 {listing.price} CZK
              </p>

              <p>
                <strong>Seller:</strong> {listing.seller?.username} ({listing.seller?.email})
              </p>

              <Link to="/" className="btn btn-outline-secondary mt-3">
                ⬅ Back to Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
