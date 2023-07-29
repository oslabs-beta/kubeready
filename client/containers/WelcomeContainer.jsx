import React from 'react';
import Login from '../components/Login.jsx'
import Signup from '../components/Signup.jsx'

const WelcomeContainer = () => {
  return (
    <div id='welcome-container'>
      <Login/>
      <Signup/>
    </div>
  );
};

export default WelcomeContainer;
