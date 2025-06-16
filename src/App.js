import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Navbar from './components/Navbar';
import AlertBox from './components/AlertBox';
import ChatWindow from './components/ChatWindow';

//Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListings';
import MessagesOverview from './pages/MessagesOverview';
import UserProfile from './pages/UserProfile';

export default function App() {
  return (
    <Router>
      <Navbar />
      <AlertBox />
      <div className='container mt-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateListing />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listing/:id' element={<ListingDetail />} />
          <Route path='/listing/:id/edit' element={<EditListing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/messages/:userId' element={<ChatWindow />} />
          <Route path='/messages' element={<MessagesOverview />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register'element={<Register />} />
          <Route path='/user/:id' element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}