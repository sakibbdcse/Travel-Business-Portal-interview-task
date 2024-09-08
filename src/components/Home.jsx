import React from 'react';
import './css/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h2>Welcome to the Home Page</h2>
            <p>This is a protected route. You are successfully logged in!</p>
        </div>
    );
};

export default Home;
