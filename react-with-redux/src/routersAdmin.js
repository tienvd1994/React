import React from 'react';
import { Route, IndexRoute } from 'react-router';
import LoginContainer from './components/LoginContainer';
import LoginPage from './components/account/LoginPage';

export default (
    <Route component={LoginContainer}>
        <Route path='/login' component={LoginPage} />
    </Route>
)