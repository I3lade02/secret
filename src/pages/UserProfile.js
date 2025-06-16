import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

export default function UserProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/${id}`);
                setProfile(res.data);
            } catch (err) {
                console.error('Error loading profile: ', err);
            }
        };

        fetchUser();
    }, [id]);

    if (!profile) return <p className='text-center mt-5'>Loading profile...</p>;

    const { user, listings } = profile;

    return (
        <Layout>
            <div className='container mt-4'>
                <div className='card p-4 shadow border-0 mb-4'>
                    <div className='d-flex align-items-center'>
                        <div className='me-4'>
                            <img
                                src={user.avatar || '/avatar-placeholder.jpg'}
                                alt='avatar'
                                className='rounded'
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        </div>
                        <div>
                            <h4 className='mb-1'>{user.username}</h4>
                            <p className='mb-1 text-secondary'>{user.email}</p>
                            {user.bio && <p className='mb-0'>{user.bio}</p>}
                        </div>
                    </div>
                </div>

                <h5>{user.username}'s listings</h5>
                {listings.length === 0 ? (
                    <p>This user has no listings yet</p>
                ) : (
                    listings.map((listing) => (
                        <div key={listing._id} className='mb-3'>
                            <Link to={`/listing/${listing._id}`} className='text-decoration-none'>
                                <div className='card p-3 shadow'>
                                    <h6 className='mb-1'>{listing.title}</h6>
                                    <small className='text-secondary'>{listing.platform} . {listing.category} . 💰 {listing.price} CZK</small>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}