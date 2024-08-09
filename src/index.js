import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';
import AWS from 'aws-sdk';
import config from './amplifyconfiguration.json';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import App from './App';


Amplify.configure(config);

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

