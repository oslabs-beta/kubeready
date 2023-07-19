import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app.jsx';
import ReactDOM from 'react-dom/client';
import store from './store';

// render App from app.jsx file on the html element with id of app in the index.html page
// render(<App />, document.getElementById('app'));
const rootElement = document.getElementById('app');
// ReactDOM.createRoot(rootElement).render(<App />);
rootElement.render(
  <Provider store={store}>
    <App />
  </Provider>
);
