import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';

// Rendering App on the HTML element with id 'app' in index.html
const root = document.getElementById('app');
ReactDOM.createRoot(root).render(<App />);
