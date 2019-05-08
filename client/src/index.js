import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { StoreContext } from 'redux-react-hook';
import store from './store';
import './styles/index.css';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root')
);
