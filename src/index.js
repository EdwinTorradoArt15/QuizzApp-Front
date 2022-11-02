import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import {global} from './css/style'
import axios from 'axios';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <ThemeProvider theme={global}>
          <App />
      </ThemeProvider>
    </ContextProvider>
  </BrowserRouter>
);

