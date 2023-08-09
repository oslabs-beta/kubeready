import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import kubereadylogo_transparent from '../assets/kubereadylogo_transparent.jpg';
// import Header from '../components/Header.jsx'


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
    <div>
      {/* <Header/> */}
      
      <div className='login-mainContainer'>

        <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 

        {/* <div className = 'login-leftContainer'>
          <div className='content'>
            <img className='logoImage' src={kubereadylogo} alt="Are you ready?" />
            <p id="instructions-title">Before logging in: </p>
            <ol>
              <li id="instructions-step">Please install Helm</li>
              <li id="instructions-step">Free up Port 3000</li>
            </ol>
            <button id='redirect-button' >
              <a href='https://www.kubeready.com'>Learn More</a>
            </button>
          </div>
        </div> */}
      
        <div className = 'login-rightContainer'>
          <div className='content'>
           <img className='logoImage' src={kubereadylogo_transparent} alt="transparent_logo" style={{ width: '200px', height: 'auto' }}/>
            <h1>Get started</h1>
            <div class='form'>
              <form onSubmit={handleSubmit}>
                <div class="inputBox">
                  <input
                    className='login-input'
                    name='username'
                    type='text'
                    placeholder='username'
                    onChange={handleUsernameChange}
                    value={username}
                  />
                </div>
                <div class="inputBox">
                  <input
                    className='login-input'
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </div>
                <div class='create-account-redirect-link'>
                  {/* <p class='question'>Don't have an account?</p> */}
                  <Link class='answer' to='/signup'>Create an account</Link>
                </div>
                <button type='submit' className='login-button' disabled={isLoading}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Login;