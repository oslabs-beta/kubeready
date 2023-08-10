import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kubereadylogo_transparent from '../assets/kubereadylogo_transparent.jpg';

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
      .then((user) => {
        console.log('User has been created.');
        setIsLoading(false);
        console.log('right before user is navigated to /homepage');
        navigate('/homepage');
        console.log('user has been navigated to /homepage');
      })
      //handle error here
      .catch((error) => {
        setIsLoading(false);
        console.log('User was not created - catch error');
      });
  };

  // signup div
  return (
    <div className = 'signup-mainContainer'>

      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 

      <div className='signup-box'>
        <div className = 'content'>
          <img className='logoImage' src={kubereadylogo_transparent} alt="transparent_logo" style={{ width: '200px', height: 'auto' }}/>
          <h2>Manage & monitor your K8 cluster metrics with ease</h2>
          <div className='form'>
            <form onSubmit={handleSubmit}>
              <div className='inputBox'>
                <input
                  className='signup-input'
                  name='name'
                  type='text'
                  placeholder='name'
                  onChange={handleNameChange}
                  value={name}
                />
              </div>
              <div className='inputBox'>
                <input
                  className='signup-input'
                  name='email'
                  type='text'
                  placeholder='email'
                  onChange={handleEmailChange}
                  value={email}
                />
              </div>
              <div className='inputBox'>
                <input
                  className='signup-input'
                  name='username'
                  type='text'
                  placeholder='username'
                  onChange={handleUsernameChange}
                  value={username}
                />
              </div>
              <div className='inputBox'>
                <input
                  className='signup-input'
                  name='password'
                  type='password'
                  placeholder='password'
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
              <div class='create-account-redirect-link'>
                {/* <p class='question'>Have an account?</p> */}
                <Link class='answer' to='/'>Already have an account?</Link>
              </div>
              <button type='submit' className='signup-button' disabled={isLoading}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
