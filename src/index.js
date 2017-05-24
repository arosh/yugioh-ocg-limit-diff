import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('react-root'));
registerServiceWorker();
