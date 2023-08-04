import React from 'react';
import LogoutContainer from './LogoutContainer.jsx';

const DashboardContainer = () => {
  return (
    <div id='dashboard-container'>
      <div id='names-metrics-text'>
        <h4>Serena's Kubernetes Metrics</h4>
        <LogoutContainer />
      </div>
      <iframe
        id='dashboard-iframe'
        title='My Dashboard'
        src='http://localhost:3000/d/a0afe1e1-2cd8-4263-9101-5eafd2efb98e/prometheus-scrapes-from-demo-apps?orgId=1&refresh=5s&from=1690467986007&to=1690489586007'
      ></iframe>
    </div>
  );
};

export default DashboardContainer;
