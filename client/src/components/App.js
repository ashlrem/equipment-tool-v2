import React, { useCallback } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
  } from 'react-router-dom';

import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import useWithAuthenticate from '../components/WithAuthenticate';
import * as routes from '../constants/routes';
import { useMappedState } from 'redux-react-hook';

import '../styles/App.css';

function App() {

  useWithAuthenticate();

  const mapState = useCallback((state) => ({
      loading: state.sessionState.loading
    }), 
  [])

  const { loading } = useMappedState(mapState);

  if (loading) return <header className="App-header"><h1>Loading...</h1></header>

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Navigation />
        <header className="App-header">
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home />} />
            <Route exact path={routes.LOGIN} component={() => <Login />} />
            <Route component={NotFound} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
