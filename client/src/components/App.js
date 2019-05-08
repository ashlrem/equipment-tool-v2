import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
  } from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import * as routes from '../constants/routes';

import '../styles/App.css';

import Navigation from '../components/Navigation';

function App() {
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
