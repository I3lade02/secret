import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark shadow'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>GameSwap</Link>

                <button 
                    className='navbar-toggle'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/listings'>Browse listings</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/profile'>My profile</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/login'>Login</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/register'>Register</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


