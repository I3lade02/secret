import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const savedListings = JSON.parse(localStorage.getItem('listings')) || [];
        if (savedUser) setUser(savedUser);
        setListings(savedListings);
    }, []);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('listings', JSON.stringify(listings));
    }, [user, listings]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    return (
        <AppContext.Provider value={{ user, setUser, listings, setListings }}>
            {children}
        </AppContext.Provider>
    );
}