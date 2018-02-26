import React from 'react';
import { render, ReactDOM } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory, match } from 'react-router';
import routes from './routes';
import { loadCourses } from './actions/courseAction';
import { loadAuthors } from './actions/authorActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

// render(
//     <Provider store={store}>
//         <Router history={browserHistory} routes={routes} />
//     </Provider>,
//     document.getElementById('root')
// );

match({ history, routes }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
        <Provider store={store}>
            <Router {...renderProps} />
        </Provider>, document.getElementById('root')
    )
})