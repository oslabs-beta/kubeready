import React from 'react';
import { useEffect } from 'react';
// you can use useNavigate to navigate programmatically in response to certain events or conditions, such as a form submission or a successful authentication.
// useLocation allows you to access the current location information in your application's URL. The location information includes the pathname (the current URL path), search (the query parameters), hash (the URL fragment), and state (any data passed through the navigation).
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutContainer from './LogoutContainer.jsx';

// define the dashboard component as a functional component
const Dashboard = () => {
  // access the current location object using the useLocation hook
  const location = useLocation();
  // get data from the location state and set it as an object with string keys and string values
  // ES11 SYNTAX - optional chaining
  // here, we're accessing the data property of the state object within the location object
  const data = location?.state?.data;
  // initialize an array to store JSX elements representing iframes
  const iframeArray = [];
  // define a variable assigned to the useNavigate hook
  const navigate = useNavigate();

  // front-end authentication:
  // if the data is unavailable, navigate back to root route
  if (!data) {
    useEffect(() => navigate('/'), []);
  } else {
    // if the data is available, create iframe for the array
    const [graph, url] = Object.entries(data)[0];

    // return the iframe wrapped in a div
    return (
      <div id='dashboard-container'>
        <iframe id='dashboard-iframe' title='My Dashboard' src={url}></iframe>
      </div>
    );
  }

  // return null if the data is unavailable
  return null;
}


// what we had before
// const DashboardContainer = () => {
//   return (
//     <div id='dashboard-container'>
//       <div id='names-metrics-text'>
//         <h4>Serena's Kubernetes Metrics</h4>
//         <LogoutContainer />
//       </div>
//       <iframe
//         id='dashboard-iframe'
//         title='My Dashboard'
//         src='http://localhost:3000/d/ed7e00e0-5b20-4bef-8422-c2a2817822c0/kubeready-dashboard?orgId=1'
//       ></iframe>
//     </div>
//   );
// };

// key={graph}

export default DashboardContainer;
