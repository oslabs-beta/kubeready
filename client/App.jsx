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
      <DashboardContainer/>
      <h1>coming from app.jsx</h1>
      hi frm app.jsx testing
    </div>
  );
};

export default App;
