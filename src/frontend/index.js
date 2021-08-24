import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
// import initialState from './initialState';

// SSR !!!!
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import reducer from './reducers';
import App from './routes/App';

const preloadedState = window.__PRELOADED_STATE__;

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, preloadedState, composeEnhancers());

delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('app'),
);
