import React, { useEffect } from 'react';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from './configs/routes';
import { getChars } from './configs/query'
import { ApolloProvider } from 'react-apollo';
import 'antd/dist/antd.css'
import './global.scss'
import { clientApollo } from './components/utils';

function App() {
  useEffect(() => { 
    getChars(clientApollo)
  }, [])

  return (
    <ApolloProvider client={clientApollo}>
      <Router history={createBrowserHistory()}>
        <Routes />
      </Router>
    </ApolloProvider>
  );
}

export default App;