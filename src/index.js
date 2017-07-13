// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as registerServiceWorker from './registerServiceWorker';
import * as qs from 'qs';
import App from './components/App';
import store from './flux/Store';
import * as UseCase from './flux/UseCase';
import './assets/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// location.search は & で始まる
const query = qs.parse(document.location.search.substr(1));
UseCase.initialize(query['new'], query['old']);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);

registerServiceWorker.unregister();
