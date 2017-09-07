import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { loadCourses } from './actions/courseAction';
import { loadAuthors } from './actions/authorActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
