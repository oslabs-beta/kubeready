import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogoutContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // delete cookie
  // bring user back to login
  const logoutClick = (e) => {
    console.log('logout clicked');
    e.preventDefault();
    setIsLoading(true);
    fetch('api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // .then((data) => data.json())
      .then((response) => {
        if (response.ok) {
          setIsLoading(false);
          console.log('user has been logged out');
          navigate('/');
        } else {
          console.log('logout failed');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('didnt work');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id='login-and-logout-container'>
      {/* <button id='login-button'>Login</button> */}
      <button id='logout-button' onClick={logoutClick} disabled={isLoading}>
        {/* <Link to='/'> */}
        Logout
        {/* </Link> */}
      </button>
    </div>
  );
};

export default LogoutContainer;
