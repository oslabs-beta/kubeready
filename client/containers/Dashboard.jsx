import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutContainer from './LogoutContainer.jsx';

const Dashboard = () => {
  const location = useLocation();
  const data = location?.state?.data;

  const navigate = useNavigate();

  if (!data) useEffect(() => navigate('/homepage'), []);
  else {
    // const [url] = Object.entries(data)[0];
    const url = '';
    return (
      <div className='dashboard-container'>
        <iframe
          className='dashboard-iframe'
          title='My Dashboard'
          src={url}
        ></iframe>
      </div>
    );
  }

  return null;
};

export default Dashboard;
