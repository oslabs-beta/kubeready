import React from 'react';
import { useState } from 'react';
import Dashboard from "../containers/Dashboard.jsx";
import { Link } from 'react-router-dom';

const Homepage = () => {
    
    return (
        <div className='homepage'>
            <header className='dashboard-header'>
                <h1>My Dashboard</h1>
                <div className='header-buttons'>
                    <Link className='logout-link' to='/'>Logout</Link>
                    <Link className='signup-link' to='/signup'>Sign Up</Link>
                </div>
            </header>
            <div className='dashboard-container'>
                <iframe className='dashboard-iframe' title='My Dashboard' src='http://localhost:3000/d/dfcbb4e4-0477-48ae-a6cb-142d2ac9d27e/kubeready-dashboard-copy?orgId=1&from=1691574746495&to=1691596346495'></iframe>
            </div>
            {/* <Dashboard /> */}
        </div>
    );

}

export default Homepage;