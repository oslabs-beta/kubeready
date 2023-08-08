import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kubereadylogo from '../assets/kubereadylogo.jpg';


const Login = () => {
  // state values and setters
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // form handleChanges - grabs data from username/password forms and adds them to state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // on login click
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not login');
        }
        return response.json();
      })
      //IF SUCCESSFUL, redirect to dashboard
      .then((loggedInUser) => {
        console.log('User has logged in');
        setIsLoading(false);
        navigate('/homepage');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('User couldnt log in');
      });
  };

  return (
    <div className='mainContainer'>
    
      <div className = 'leftContainer'>
        {/* would like the below to be our logo - maybe? would need to upload photo in assets */}
        <img className='logoImage' src={kubereadylogo} alt="Are you ready?" />
      
        <p>Before logging in: 
          <br />
          <li>Please install Helm</li>
          <li>Free up Port 3000</li>
          </p>
          <br />
          <button className='redirecttosplash-button'>
            <Link to='/splash'>Learn more about </Link>
          </button>
        
      </div>
    
      <div className = 'rightContainer'>
        <div className='login'>
        {/* <button onSubmit={handleSubmit}>Show Alert</button> */}
        <h3 style={{ color: 'white' }}>Get Started</h3>
        <form onSubmit={handleSubmit}>
          <input
            className='login-input'
            name='username'
            type='text'
            placeholder='Username'
            onChange={handleUsernameChange}
            value={username}
          />
          <br />
          <input
            className='login-input'
            name='password'
            type='password'
            placeholder='Password'
            onChange={handlePasswordChange}
            value={password}
          />
          <br />
          <button type='submit' className='login-button' disabled={isLoading}>
            Login
          </button>
        </form>
        <br />
        <button className='createAcct-button'>
          <Link to='/signup'>Don't have an account?</Link>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Login;
