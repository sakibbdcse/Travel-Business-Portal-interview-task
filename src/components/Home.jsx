import React from 'react';
import './css/Home.css';
import ManageProducts from './ManageProducts';

const Home = () => {
    return (
        <div className="home-container">
            <h2>Welcome to the Home Page</h2>
            <p>You are successfully logged in!</p>
            <ManageProducts />
        </div>
    );
};

export default Home;
