// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as registerServiceWorker from './registerServiceWorker';
import './assets/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('react-root'));
registerServiceWorker.unregister();
