import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/umd/popper.min'
import 'bootstrap/dist/js/bootstrap.min'
// import App from './App';
import MapMarker from './MapMarker'
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MapMarker />, document.getElementById('root'));
registerServiceWorker();
