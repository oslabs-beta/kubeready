import React from 'react';
import './styles/styles.scss';
import DashboardContainer from './containers/DashboardContainer.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <div id='header'>
        <h1 id='title'>
          <Link to='/'>kubeready</Link>
        </h1>
      </div>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/homepage' element={<DashboardContainer />} />
      </Routes>
    </div>
  );
};

export default App;
