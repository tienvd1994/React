import React from 'react'
import { Router, browserHistory, IndexRoute, Route, IndexRedirect } from 'react-router'

import App from './components/App'
import HomePage from './components/home/HomePage'
import ProductPage from './components/product/ProductPage'


const Routes = props => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="/products" component={ProductPage} />
            </Route>
            <Route path="*">
                <IndexRedirect to="/" />
            </Route>
        </Router>
    )
}

export default Routes