import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className='container mt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listing/:id' element={<ListingDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register'element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}