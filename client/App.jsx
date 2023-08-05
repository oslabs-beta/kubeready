//import necessary packages
import React from 'react';
//import the stylesheet
import './styles/styles.scss';
//import apps child
// import ClusterContainer from './containers/ClusterContainer.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
// import LogoutContainer from './containers/LogoutContainer.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
//testing out react router here!!
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <div id='header'>
        <h1 id='title'>
          <Link to='/'>kubeready</Link>
        </h1>
        {/* <LogoutContainer /> */}
      </div>
      {/* The name is hard coded for now. */}
      {/* <h4 id='names-metrics-text'>Serena's Kubenetes Metrics</h4> */}
      {/* <BrowserRouter> */}
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/homepage' element={<DashboardContainer />} />
      </Routes>
      {/* </BrowserRouter> */}
      {/* <Login />
      <SignUp />
      <DashboardContainer /> */}
    </div>
  );
};

export default App;

// //import necessary packages
// import React from 'react';
// //import the stylesheet
// import './styles/styles.scss';
// //import apps child
// // import ClusterContainer from './containers/ClusterContainer.jsx';
// import DashboardContainer from './containers/DashboardContainer.jsx';
// // import LogoutContainer from './containers/LogoutContainer.jsx';
// import Login from './components/Login.jsx';
// import SignUp from './components/SignUp.jsx';
// import AppLayout from './components/AppLayout.jsx';
// //testing out react router here!!
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Routes,
//   Route,
//   Link,
// } from 'react-router-dom';

// const appRouter = createBrowserRouter(
//   createRoutesFromElements(
//     <Route element={<AppLayout />}>
//       <Route exact path='/' element={<Login />} />
//       <Route exact path='/signup' element={<SignUp />} />
//       <Route exact path='/homepage' element={<DashboardContainer />} />
//     </Route>
//   )
// );

// function App() {
//   // (
//   // <div>
//   //   <div id='header'>
//   //     <h1 id='title'>
//   //       <Link to='/'>kubeready</Link>
//   //     </h1>
//   return <RouterProvider router={appRouter} />;
//   //   {/* <LogoutContainer /> */}
//   // // </div>
//   // {/* The name is hard coded for now. */}
//   // {/* <h4 id='names-metrics-text'>Serena's Kubenetes Metrics</h4> */}
//   // {/* <BrowserRouter> */}
//   // {/* <Routes>
//   //   <Route exact path='/' element={<Login />} />
//   //   <Route exact path='/signup' element={<SignUp />} />
//   //   <Route exact path='/homepage' element={<DashboardContainer />} />
//   // </Routes> */}
//   // {/* </BrowserRouter> */}
//   // {/* <Login />
//   // <SignUp />
//   // <DashboardContainer /> */}
//   // </div>
//   // );
// }

// export default App;
