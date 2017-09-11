import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import ProductPage from './components/product/ProductPage';
import AddProduct from './components/product/AddProduct';
import AboutPage from './components/about/AboutPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="products" component={ProductPage} />
        <Route path="product" component={AddProduct} />
        <Route path="product/:id" component={AddProduct} />
        <Route path="about" component={AboutPage} />
    </Route>
)