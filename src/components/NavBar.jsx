import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/create">Create Product</Link>
            <Link to="/manage">Manage Products</Link>

            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default NavBar;