import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick'
import registerServiceWorker from './registerServiceWorker';
import './assets/css/common.less'
import './assets/js/rem'

import { App } from './views'
FastClick.attach(document.body);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
