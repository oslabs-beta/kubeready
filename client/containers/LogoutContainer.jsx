import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LogoutContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Delete cookie & bring user back to login
  const logoutClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch('api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsLoading(false);
          navigate('/');
        } else {
          console.log('Logout unsuccessful');
        }
      })
      .catch((error) => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id='login-and-logout-container'>
      <button id='logout-button' onClick={logoutClick} disabled={isLoading}>
        Logout
      </button>
    </div>
  );
};

export default LogoutContainer;
