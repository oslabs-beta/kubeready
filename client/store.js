//single source of truth is store.js - for redux

import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';

const store = configureStore(reducers, composeWithDevTools());

export default store;
