import React from 'react';

const DashboardContainer = () => {
  return (
    <div id='dashboard-container'>
      <iframe
        id='dashboard-iframe'
        title='My Dashboard'
        src='http://localhost:3000/d/a0afe1e1-2cd8-4263-9101-5eafd2efb98e/prometheus-scrapes-from-demo-apps?from=1690453995180&to=1690475595180&orgId=1'
      ></iframe>
    </div>
  );
};

export default DashboardContainer;
