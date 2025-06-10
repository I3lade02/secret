import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ListingDetail() {
    const { id } = useParams(); //get listing ID from the URL

    //Mock data
    const listing = {
        id, 
        title: 'Elden Ring (PS5)',
        category: 'Game disc',
        platform: 'Playstation',
        condition: 'Like new',
        price: 39.99,
        description: 'Includes original case and manual. Only played once',
        seller: {
            username: 'I3lade',
            email: 'ondrej.ber@email.cz',
        },
    };

    return (
        <div className='container mt-4'>
            <h2>{listing.title}</h2>
            <p className='text-muted'>{listing.category} . {listing.platform}</p>

            <div className='mb-3'>
                <strong>Condition: </strong> {listing.condition}<br />
                <strong>Price: </strong> {listing.price}<br />
                <strong>Description: </strong> {listing.description}
            </div>

            <div className='border-top pt-3'>
                <h5>Seller info</h5>
                <p>
                    <strong>Username: </strong> {listing.seller.username}<br />
                    <strong>Email: </strong> {listing.seller.email}
                </p>
            </div>

            <Link to='/listings' className='btn btn-secondary mt-3'>Back to listings</Link>
        </div>
    );
}