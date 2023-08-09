import React from 'react';

const DashboardContainer = () => {
  return (
    <div id='dashboard-container'>
      <iframe
        id='dashboard-iframe'
        title='My Dashboard'
        src='http://localhost:3000/d/ed7e00e0-5b20-4bef-8422-c2a2817822c0/kubeready-dashboard?orgId=1'
      ></iframe>
    </div>
  );
};

export default DashboardContainer;
