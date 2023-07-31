//import necessary packages
import React from 'react';
//import the stylesheet
import './styles/styles.scss';
//import apps child
// import ClusterContainer from './containers/ClusterContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import LogoutContainer from './containers/LogoutContainer.jsx';
import Login from './components/Login.jsx';
//testing out react router here!!
import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <div id='header'>
        <h1 id='title'>kubeready</h1>
        <LogoutContainer />
      </div>
      {/* The name is hard coded for now. */}
      <h4 id='names-metrics-text'>Serena's Kubenetes Metrics</h4>
      {/* <Routes>
        <Route exact path='/log' element={<Login />} ></Route>
      </Routes> */}
      <Login/>
      
      <DashboardContainer />
    </div>
  );
};

export default App;
