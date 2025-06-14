// src/pages/Listings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from '../components/ListingCard';
import Layout from '../components/Layout';

function Listings() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [platform, setPlatform] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 6;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/listings');
        setListings(res.data);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, platform]);

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || listing.category === category;
    const matchesPlatform = !platform || listing.platform === platform;
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const indexOfLast = currentPage * listingsPerPage;
  const indexOfFirst = indexOfLast - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Browse Listings</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search by title"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option>Game Disc</option>
              <option>Digital Code</option>
              <option>Figurine</option>
              <option>Accessory</option>
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">All Platforms</option>
              <option>PlayStation</option>
              <option>Xbox</option>
              <option>Switch</option>
              <option>PC</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {currentListings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          currentListings.map(listing => (
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

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Listings;
