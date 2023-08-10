import React from 'react';
import { useState } from 'react';
import Dashboard from '../containers/Dashboard.jsx';
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
      <iframe
        id='dashboard-iframe'
        title='My Dashboard'
        src='http://localhost:3000/d/fe3fe54b-0830-42bc-8012-0219b44f4234/kubeready?orgId=1'
      ></iframe>
      <Dashboard />
    </div>
  );
};

export default Homepage;
