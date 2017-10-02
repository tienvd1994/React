import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import ProductPage from './components/product/ProductPage';
import AddProduct from './components/product/AddProduct';
import CategoryPage from './components/category/CategoryPage';
import AddCategory from './components/category/AddCategory';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="products" component={ProductPage} />
        <Route path="product" component={AddProduct} />
        <Route path="product/:id" component={AddProduct} />

        <Route path="categories" component={CategoryPage} />
        <Route path="category" component={AddCategory} />
        <Route path="category/:id" component={AddCategory} />
    </Route>
)