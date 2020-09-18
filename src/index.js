import React from 'react';
import {App} from './App.js';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {store} from 'helpers';

import 'assets/css/nucleo-icons.css';
import 'react-notification-alert/dist/animate.css';
import 'assets/css/black-dashboard-pro-react.css';
import 'assets/css/style.css';
import 'react-notification-alert/dist/animate.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
