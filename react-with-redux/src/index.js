import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import App from './components/App';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
// import { loadProducts } from './actions/productActions';

// css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// js
import $ from 'jquery';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
// store.dispatch(loadProducts("", 1, 20));

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
