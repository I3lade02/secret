// src/pages/Listings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');

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

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || listing.category === category;
    const matchesPlatform = !platform || listing.platform === platform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  return (
    <div className="container mt-4">

      <div className='row mb-4'>
        <div className='col-md-4'>
          <input 
            type='text'
            placeholder='Search by title'
            className='form-control'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='col-md-4'>
          <select
            className='form-select'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            <option>Game Disc</option>
            <option>Digital Code</option>
            <option>Figurine</option>
            <option>Accessory</option>
          </select>
        </div>

        <div className='col-md-3'>
          <select
            className='form-select'
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">All platforms</option>
            <option>PlayStation</option>
            <option>Xbox</option>
            <option>Switch</option>
            <option>PC</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <h2 className="mb-4">Browse Listings</h2>

      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        filteredListings.map(listing => (
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
