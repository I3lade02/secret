import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

export default function ChatWindow() {
    const { user, showAlert } = useContext(AppContext);
    const { userId } = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const messagesEndRef = useRef();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
                    headers: { Authorization: token }
                });
                setMessages(res.data);
            } catch (err) {
                console.error('Error loading messages: ', err);
                if (user) showAlert('danger', 'Failed to load messages');
            }
        };

        if (user) {
            fetchMessages();
        }
    }, [userId, user, showAlert]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/messages', { receiver: userId, text}, { headers: { Authorization: token } });
            setMessages([...messages, res.data]);
            setText('');
        } catch (err) {
            console.error('Failed to send message: ', err);
            showAlert('danger', 'Failed to send message');
        }
    };

    return (
        <div className='container mt-4'>
            <h4>Chat</h4>
            <div className='border rounded p-3 mb-3' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {messages.map((msg) => {
                    const isCurrentUser = user && msg.sender && msg.sender._id === user.id;
                    return (
                        <div key={msg._id} className={`mb-2 ${isCurrentUser ? 'text-end' : 'text-start'}`}>
                        <strong>{msg.sender?.username}:</strong>
                        <p className='mb-1'>{msg.text}</p>
                        <small className='text-muted'>
                            {new Date(msg.timestamp).toLocaleString()}
                        </small>
                        </div>
                    );
                })}
                <div ref={messagesEndRef}></div>
            </div>

            <form onSubmit={sendMessage} className='d-flex'>
                <input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='form-control me-2'
                    placeholder='Type your message...'
                    required
                />
                <button type='submit' className='btn btn-primary'>Send</button>
            </form>
        </div>
    );
}