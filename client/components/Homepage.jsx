// Import dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// logout progress 10/6:
// identified there are errors in handleLogout after adding console logs

// logout progres 10/13:
// identified error is coming from improper json syntax from response

// to do: 
// troubleshoot json syntax/fetch content type
// investigate using res.locals for logout
// identify where redirect/navigate should be performed
// add functionality to remove cookie and redirect successfully (cookieParser?)

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // define logout function here
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('entering handleLogout function- logging');

    fetch('api/logout', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log('are we hitting line 19- logging');
        console.log('response looks like this: ', response);
        if (!response.ok) {
          console.log('not working line 22');
          throw new Error('Could not logout');
        } 
        console.log('response status is OK-logging')
        return response.json();
      })
      // if logout successful, redirect to /
      
      .then((loggingOutUser) => {
        console.log('User has logged out');
        setIsLoading(false);
        // navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('User could not logout- logging');
        console.log('error string: ', error);
      });
  };

  return (
    <div className='homepage'>
      <header className='dashboard-header'>
        <h1>My Dashboard</h1>
        <div className='header-buttons'>
          <button className='logout-link' disabled={isLoading} onClick={handleLogout}>
            Logout
          </button>
          {/* <Link className='logout-link' to='/'>
            Logout
          </Link> */}
        </div>
      </header>
      <div className='dashboard-container'>
        <iframe
          className='dashboard-iframe'
          title='My Dashboard'
          src='http://localhost:3000/d/dfcbb4e4-0477-48ae-a6cb-142d2ac9d27e/kubeready-dashboard-copy?orgId=1&from=1691574746495&to=1691596346495'
        ></iframe>
      </div>
    </div>
  );
};

export default Homepage;
