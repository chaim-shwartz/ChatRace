import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Button from '@mui/material/Button';
import Login from './Login';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';



ReactDOM.render(
  
  <div>
    <CookiesProvider>
    <App/>
    </CookiesProvider>
  </div>,
  document.getElementById('root')
);

