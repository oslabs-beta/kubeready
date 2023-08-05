//import necessary packages
import React from 'react';
//import the stylesheet
import './styles/styles.scss';
//import apps child
// import ClusterContainer from './containers/ClusterContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';

const App = () => {
  return (
    <div>
      <div id='header'>
        <h1 id='title'>kubeready</h1>
      </div>
      {/* The name is hard coded for now. */}
      <h4 id='names-metrics-text'>Serena's Kubenetes Metrics</h4>
      <DashboardContainer />
    </div>
  );
};

export default App;
