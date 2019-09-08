import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './components/Utils/registerServiceWorker';
import ReactGA from 'react-ga';

import config from './config/Config';
ReactGA.initialize(config.googleAnalytics);
ReactGA.set({ page: window.location.pathname + window.location.search });
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App reactGA={ ReactGA } />, document.getElementById('root'));
registerServiceWorker();
