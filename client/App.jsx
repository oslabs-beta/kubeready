import React from 'react';
import './styles/styles.scss';
// import ClusterContainer from './containers/ClusterContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import LogoutContainer from './containers/LogoutContainer.jsx';

const App = () => {
  return (
    <div>
      <div id='header'>
        <h1 id='title'>kubeready</h1>
        <LogoutContainer />
      </div>
      {/* The name is hard coded for now. */}
      <h4 id='names-metrics-text'>Serena's Kubenetes Metrics</h4>
      <DashboardContainer />
    </div>
  );
};

export default App;
