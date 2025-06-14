import React from 'react';

export default function Layout({ children }) {
    return (
        <div className='container py-4'>
            {children}
        </div>
    );
}