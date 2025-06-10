import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.prevendDefault();

        //placeholder for real login logic
        console.log('Loggin in with: ', email, password);

        // TODO: replace with real API request and error handling 
        if (email && password) {
            //simulation of successful login
            alert('Logged in successfully');
            navigate('/home');
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <div className='container mt-4' style={{ maxWidth: '400px'}}>
            <h2 className='mb-4'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input 
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@example.com'
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Your password'
                    />
                </div>

                <button type='submit' className='btn btn-primary w-100'>Login</button>
            </form>
        </div>
    );
}