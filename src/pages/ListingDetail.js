import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import Layout from '../components/Layout';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { user } = useContext(AppContext);

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
  console.log('🔍 Current user:', user);
  console.log('🧑‍💼 Listing seller:', listing?.seller);
  console.log('🆔 user.id:', user?.id);
  console.log('🆔 seller._id:', listing?.seller?._id);
  return (
    <Layout>
      <div className="container mt-4">
        <div className="card p-4 shadow-sm border-0">
          <div className="row g-4">
            {/* Listing Image */}
            <div className="col-md-4 text-center">
              {listing.image ? (
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="img-fluid rounded"
                  style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '250px',
                    backgroundColor: '#eee',
                    borderRadius: '0.5rem'
                  }}
                ></div>
              )}
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

              {listing.seller && (
                <p>
                  <strong>Seller:</strong> {listing.seller.username} ({listing.seller.email})
                </p>
              )}

              <div className="mt-3 d-flex flex-wrap gap-2">
                <Link to="/" className="btn btn-outline-secondary">
                  ⬅ Back to Listings
                </Link>

                {listing.seller && (
                  <Link className="btn btn-outline-primary" to={`/user/${listing.seller._id}`}>
                    👤 View Seller Profile
                  </Link>
                )}

                {user ? (
                  listing.seller &&
                  user.id !== listing.seller._id && (
                    <Link
                      to={`/messages/${listing.seller._id}`}
                      className="btn btn-outline-success"
                    >
                      💬 Message Seller
                    </Link>
                  )
                ) : (
                  <p className="text-muted mt-2">🔐 Log in to message the seller</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
