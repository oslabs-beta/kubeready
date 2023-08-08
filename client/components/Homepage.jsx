import React from 'react';
import { useState } from 'react';
import Dashboard from "../containers/DashboardContainer.jsx";
import { Link } from 'react-router-dom';

const Homepage = () => {
    
    return (
        <div className='homepage'>
            {/* Header */}
            <header className='dashboard-header'>
                <h1>My Dashboard</h1>
                <div className='header-buttons'>
                    <button className='logout-button'>
                      <Link to='signin'>Logout</Link>
                    </button>
                    <button className='signup-button'>
                      <Link to='/signup'>Sign Up</Link>
                    </button>
                </div>
            </header>

            {/* Dashboard */}
            <Dashboard />
        </div>
    );

}

export default Homepage;