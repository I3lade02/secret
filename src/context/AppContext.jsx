import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3500);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        showAlert('success', 'Logged out successfully');
    };

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
        <AppContext.Provider value={{ user, setUser, listings, setListings, alert, showAlert, setAlert, logout }}>
            {children}
        </AppContext.Provider>
    );
}