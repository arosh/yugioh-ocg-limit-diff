// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './flux/Store';
import * as UseCase from './flux/UseCase';
import './assets/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

UseCase.initialize();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
);

registerServiceWorker.unregister();
