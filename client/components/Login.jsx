import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kubereadylogo from '../assets/kubereadylogo.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //Form handleChanges - grabs data from username/password forms and adds them to state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //On login click
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
      //If successful, redirect to dashboard
      .then((loggedInUser) => {
        setIsLoading(false);
        navigate('/homepage');
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div className='login'>
      <h3 style={{ color: 'white' }}>Login to your kubeready account</h3>
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
        <Link to='/signup'>Create an Account</Link>
      </button>
    </div>
  );
};

export default Login;
