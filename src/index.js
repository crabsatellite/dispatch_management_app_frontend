/**
 * Copyright (c) 2023
 *
 * @summary Implementation of index.js
 * @author 202302 Flag Camp Team03
 * @date 2023-04-28  
 *  
 */

// Project imports 
import './index.css';
import App from './App';

// React imports
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
