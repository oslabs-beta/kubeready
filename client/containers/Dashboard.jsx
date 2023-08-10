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
      <div id='dashboard-container'>
        <iframe
          id='dashboard-iframe'
          title='My Dashboard'
          src='http://localhost:3000/d/fe3fe54b-0830-42bc-8012-0219b44f4234/kubeready?orgId=1'
        ></iframe>
      </div>
    );
  }

  return null;
};

export default Dashboard;
