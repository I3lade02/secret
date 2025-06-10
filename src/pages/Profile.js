// src/pages/Profile.jsx
import React from 'react';
import ListingCard from '../components/ListingCard';

export default function Profile() {
  // Simulated logged-in user
  const user = {
    username: "GamerDude42",
    email: "gamer42@example.com",
  };

  // Dummy user listings
  const myListings = [
    {
      id: 101,
      title: "Resident Evil Village",
      category: "Game Disc",
      platform: "PlayStation",
      condition: "Good",
      price: 35.00,
    },
    {
      id: 102,
      title: "Zelda Amiibo - Link",
      category: "Figurine",
      platform: "Switch",
      condition: "Like New",
      price: 25.00,
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>

      <hr />

      <h4 className="mt-4 mb-3">Your Listings</h4>
      {myListings.length > 0 ? (
        myListings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            category={listing.category}
            platform={listing.platform}
            condition={listing.condition}
            price={listing.price}
          />
        ))
      ) : (
        <p>You haven’t posted any listings yet.</p>
      )}
    </div>
  );
}

