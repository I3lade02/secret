// src/pages/ListingDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error('Failed to load listing:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <p className="mt-4">Loading listing...</p>;
  if (!listing) return <p className="mt-4 text-danger">Listing not found.</p>;

  return (
    <div className="container mt-4">
      <h2>{listing.title}</h2>
      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Platform:</strong> {listing.platform}</p>
      <p><strong>Condition:</strong> {listing.condition}</p>
      <p><strong>Price:</strong> {listing.price} CZK</p>
      <p><strong>Seller:</strong> {listing.seller?.username || 'Unknown'}</p>
    </div>
  );
}

export default ListingDetail;
