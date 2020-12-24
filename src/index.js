import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

/* 
From Auth0:
Domain: dev-9389el5o.au.auth0.com
Client ID: Tmg4a49Kay86YE5ZMc51UIkRFJFEEQQg
https://auth0.com/docs/libraries/auth0-react
*/
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-9389el5o.au.auth0.com'
      clientId='Tmg4a49Kay86YE5ZMc51UIkRFJFEEQQg'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
