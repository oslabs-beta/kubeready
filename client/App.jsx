import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './styles/styles.scss';

// import DashboardContainer from './containers/DashboardContainer.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Homepage from './components/Homepage.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/homepage' element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;