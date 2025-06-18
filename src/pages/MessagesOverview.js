import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Layout from '../components/Layout';

export default function MessagesOverview() {
    const { showAlert, user } = useContext(AppContext);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/messages/conversations', {
                    headers: { Authorization: token },
                });
                setConversations(res.data);
            } catch (err) {
                console.error('Failed to fetch coversations: ', err);
                if (user) showAlert('danger', 'Could not load conversations');
            }
        };
        if (user) {
            fetchConversations();
        }
    }, [showAlert, user]);

    return (
        <Layout>
            <div className='container mt-4'>
                <h3>Your conversations</h3>
                {conversations.length === 0 ? (
                    <p>You haven't messaged anyone yet</p>
                ) : (
                    <ul className='list-group'>
                        {conversations.map((user) => (
                            <li key={user._id} className='list-group-item d-flex justify-content-between align-items-center'>
                                <span>{user.username} ({user.email})</span>
                                <Link to={`/messages/${user._id}`} className='btn btn-sm btn-outline-primary'>Open chat</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}