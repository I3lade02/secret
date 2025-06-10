import React from 'react';
import ListingCard from '../components/ListingCard';

export default function Listings() {
    const listings = [
        {
            id: 1,
            title: 'The Legend of Zelda: Tears of the Kingdom',
            category: 'Game disc',
            platform: 'Switch',
            condition: 'New (sealed)',
            price: 59.99
        },
        {
            id: 2,
            title: 'Cyberpunk 2077',
            category: 'Digital code',
            platform: 'PC',
            condition: 'New',
            price: 29.99,
        },
        {
            id: 3,
            title: 'God of War Kratos figurine',
            category: 'Figurine',
            platform: 'Playstation',
            condition: 'Like new',
            price: 45.00,
        },
    ];

    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Browse listings</h2>

            {listings.map(listing => (
                <ListingCard
                    key={listing.id}
                    id={listing.id}
                    title={listing.title}
                    category={listing.category}
                    platform={listing.platform}
                    condition={listing.condition}
                    price={listing.price}
                />
            ))}
        </div>
    );
}