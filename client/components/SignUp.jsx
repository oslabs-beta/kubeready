import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const SignUp = () => {
  // state values and setters
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // form handleChanges
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // on signup click
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    // grab data out of state and post to mongoDB
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('User was not created - response error');
        }
        return response.json();
      })
      // IF SUCCESSFUL send to dashboard page
      .then((createdUser) => {
        console.log('User has been created.');
        setIsLoading(false);
        navigate('/homepage');
      })
      //handle error here
      .catch((error) => {
        setIsLoading(false);
        console.log('User was not created - catch error');
      });
  };

  // signup div
  return (
    <div className='signUp'>
      <h3 style={{ color: 'white' }}>Create your kubeready account</h3>
      <form onSubmit={handleSubmit}>
        <input
          className='signup-input'
          name='name'
          type='text'
          placeholder='Name'
          onChange={handleNameChange}
          value={name}
        />
        <br />
        <input
          className='signup-input'
          name='email'
          type='text'
          placeholder='Email'
          onChange={handleEmailChange}
          value={email}
        />
        <br />
        <input
          className='signup-input'
          name='username'
          type='text'
          placeholder='Enter Username'
          onChange={handleUsernameChange}
          value={username}
        />
        <br />
        <input
          className='signup-input'
          name='password'
          type='password'
          placeholder='Create Password'
          onChange={handlePasswordChange}
          value={password}
        />
        <br />
        <button type='submit' className='signup-button' disabled={isLoading}>
          {/* <Link to='/homepage'>Sign Up</Link> */}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
