import React from 'react';
import App from './app.jsx';
import ReactDOM from 'react-dom/client';

// render App from app.jsx file on the html element with id of app in the index.html page
// render(<App />, document.getElementById('app'));
const rootElement = document.getElementById('app');
ReactDOM.createRoot(rootElement).render(<App />);
