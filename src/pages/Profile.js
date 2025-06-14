// src/pages/Profile.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ListingCard from '../components/ListingCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Profile() {
  const { user, showAlert } = useContext(AppContext);
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/listings', {
          headers: { Authorization: token }
        });

        const userListings = res.data.filter(l => {
          return l.seller && (l.seller._id === user.id || l.seller === user.id);
        });
        setMyListings(userListings);
      } catch (err) {
        console.error('Error loading listings:', err);
      }
    };

    if (user) fetchMyListings();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/listings/${id}`, {
        headers: { Authorization: token }
      });

      setMyListings(myListings.filter(l => l._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
      showAlert('danger', 'Could not delete listing');
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Welcome, {user?.username}</h2>
        <p>Email: {user?.email}</p>

        <Link to="/create" className="btn btn-outline-primary mb-4">+ Post New Listing</Link>

        <h4>Your Listings</h4>
        {myListings.length === 0 ? (
          <p>You don’t have any listings yet.</p>
        ) : (
          myListings.map((listing) => (
            <div key={listing._id}>
              <ListingCard
                id={listing._id}
                title={listing.title}
                category={listing.category}
                platform={listing.platform}
                condition={listing.condition}
                price={listing.price}
                seller={listing.seller?._id || listing.seller}
                user={user}
                canDelete={true}
                canEdit={true}
                onDelete={handleDelete}
              />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}

export default Profile;
