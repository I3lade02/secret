import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='text-center mt-5'>
            <h1 className='display-4'>Welcome to GameSwap</h1>
            <p className='lead'>
                A community marketplace for video game lovers - buy, sell, and trade games, codes, merchandise and collectibles
            </p>

            <div className='mt-4'>
                <Link to='/listings' className='btn btn-primary btn-lg mx-2'>Browse listings</Link>
                <Link to='/login' className='btn btn-outline-light btn-lg mx-2'>Login</Link>
            </div>
        </div>
    );
}