// src/pages/Listings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/listings')
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching listings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Browse Listings</h2>

      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map(listing => (
          <ListingCard
            key={listing._id}
            id={listing._id}
            title={listing.title}
            category={listing.category}
            platform={listing.platform}
            condition={listing.condition}
            price={listing.price}
          />
        ))
      )}
    </div>
  );
}

export default Listings;
