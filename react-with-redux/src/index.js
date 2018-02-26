import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import Routes from './routes';
// css
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/metismenu/dist/metisMenu.css';
import '../src/styles/sb-admin-2.css';
import '../node_modules/morris.js/morris.css'
import '../src/styles/font-awesome/css/font-awesome.min.css';
import '../node_modules/jquery-validation/dist/localization/messages_vi';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('root'));
