import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Home() {
  const { user } = useContext(AppContext);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-dark px-3">
      <div className="bg-dark p-5 rounded shadow-lg text-center animate__animated animate__fadeIn" style={{ maxWidth: '800px', width: '100%' }}>
        <h1 className="display-4 fw-bold mb-3 text-primary">🎮 GameSwap</h1>
        <p className="lead text-secondary mb-4">
          Buy, sell and trade video games, digital codes, accessories and collectibles — gamer to gamer.
        </p>

        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <Link to="/listings" className="btn btn-primary btn-lg shadow-sm">
            Browse Listings
          </Link>
          {user && (
            <Link to="/create" className="btn btn-outline-success btn-lg shadow-sm">
              Post a Listing
            </Link>
          )}
        </div>
      </div>

      <div className="container mt-5 animate__animated animate__fadeInUp">
        <h3 className="text-center mb-4 text-light">How It Works</h3>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-dark rounded shadow-lg h-100">
              <h5>🔍 Browse or Search</h5>
              <p className="text-light">Explore listings for games, codes, and more.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-dark rounded shadow-lg h-100">
              <h5>💬 Message and Deal</h5>
              <p className="text-light">Contact sellers to make an offer or ask questions.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 bg-dark rounded shadow-lg h-100">
              <h5>✅ Safe Exchange</h5>
              <p className="text-light">Complete trades on your terms — locally or by shipping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
