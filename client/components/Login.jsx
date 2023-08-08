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
    <div className='login-mainContainer'>

      <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
    
      <div className = 'login-leftContainer'>
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
    
      {/* class=signin */}
      <div className = 'login-rightContainer'>
        {/* class="content" */}
        <div className='login'>
          <h1>Get Started</h1>
          <form onSubmit={handleSubmit}>
            <div class="inputBox">
              <input
                className='login-input'
                name='username'
                type='text'
                placeholder='Username'
                onChange={handleUsernameChange}
                value={username}
              />
            </div>
            <div class="inputBox">
              <input
                className='login-input'
                name='password'
                type='password'
                placeholder='Password'
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div class="inputBox">
              <button type='submit' className='login-button' disabled={isLoading}>
                Login
              </button>
            </div>
          </form>
          {/* <button className='createAcct-button'>
            <Link to='/signup'>Don't have an account?</Link>
          </button> */}
          <div class='create-account-redirect-link'>
            <p>Don't have an account?</p>
            <a>Create an Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;





// HTML FROM BOOTSTRAP BELOW
// working on modifying this



<section> 
  {/* This is the right container */}
<div class="signin"> 
{/* This is the content that holds the right container */}
 <div class="content"> 
 {/* Sign-in title ("Get Started") */}
  <h2>Sign In</h2> 
  {/* This div holds username input, password input, and the submit button */}
  <div class="form">
   
   <div class="inputBox">
    <input type="text" required> <i>Username</i> 
   </div> 
   
   <div class="inputBox"> 
    <input type="password" required> <i>Password</i> 
   </div> 
   
   <div class="links"> <a href="#">Forgot Password</a> <a href="#">Signup</a> </div> 

   <div class="inputBox"> 
    <input type="submit" value="Login"> 
   </div> 

  </div> 
 </div> 
</div> 
</section>
