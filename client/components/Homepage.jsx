// Import dependencies
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// logout progress 10/6:
// identified there are errors in handleLogout after adding console logs
// to do: zero in on error and make sure nothing is broken, then add functionality to remove cookie and redirect successfully (cookieParser?)

const Homepage = () => {
  const navigate = useNavigate();
  // define logout function here
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('entering handleLogout function');

    fetch('api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('are we hitting line 19');
        if (!response.ok) {
          console.log('not working line 22');
          throw new Error('Could not logout');
        }
        return response.json();
      })
      // if logout successful, redirect to /
      .then((loggingOutUser) => {
        console.log('User has logged out');
        navigate('/');
      })
      .catch((error) => {
        console.log('User could not logout');
      });
  };

  return (
    <div className='homepage'>
      <header className='dashboard-header'>
        <h1>My Dashboard</h1>
        <div className='header-buttons'>
          <button className='logout-link' onClick={handleLogout}>
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
