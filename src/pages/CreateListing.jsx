import React from 'react';
import ListingForm from '../components/ListingForm';
import Layout from '../components/Layout';

export default function CreateListing() {
    return (
        <Layout>
            <div className='container mt-4'>
                <ListingForm/>
            </div>
        </Layout>
    );
}