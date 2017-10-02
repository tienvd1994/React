import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import { loadProducts } from './actions/productActions';

// css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/metismenu/dist/metisMenu.css';
import '../src/styles/sb-admin-2.css';
import '../node_modules/morris.js/morris.css'
import '../src/styles/font-awesome/css/font-awesome.min.css';

// js
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
