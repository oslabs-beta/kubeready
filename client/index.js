import React from 'react';

// import { Provider } from 'react-redux';
// import store from './store.js';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// render App from app.jsx file on the html element with id of app in the index.html page
// render(<App />, document.getElementById('app'));
const root = document.getElementById('app');
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

//WITH REDUX
// root.render(
//   // wrap the App in the Provider Component and pass in the store
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// const rootElement = document.getElementById('root');
// ReactDOM.createRoot(rootElement).render(<App />);

// import React from 'react';

// // import { Provider } from 'react-redux';
// // import store from './store.js';
// import App from './App.jsx';
// import ReactDOM from 'react-dom/client';

// // render App from app.jsx file on the html element with id of app in the index.html page
// // render(<App />, document.getElementById('app'));
// const root = document.getElementById('app');
