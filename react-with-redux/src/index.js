import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';
// import routes from './routes';

import App from './components/App';
import HomePage from './components/home/HomePage';

// Products.
import ProductPage from './components/product/ProductPage';
import AddProduct from './components/product/AddProduct';
import CategoryPage from './components/category/CategoryPage';
import AddCategory from './components/category/AddCategory';

// News
import CategoryNewsPage from './components/categorynews/CategoryNewsPage';
import AddCategoryNews from './components/categorynews/AddCategoryNews';
import NewsPage from './components/news/NewsPage';
import AddNewsPage from './components/news/AddNewsPage';

// Login
import LoginContainer from './components/LoginContainer';
import LoginPage from './components/account/LoginPage';

// Configuration.
import ConfigurationPage from './components/configuration/ConfigurationPage';

// css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/metismenu/dist/metisMenu.css';
import '../src/styles/sb-admin-2.css';
import '../node_modules/morris.js/morris.css'
import '../src/styles/font-awesome/css/font-awesome.min.css';
import '../node_modules/jquery-validation/dist/localization/messages_vi';

// js
import registerServiceWorker from './registerServiceWorker';
const store = configureStore();

function authenticate(nextState, replaceState, callback) {
    if (localStorage.getItem('access_token') === null) {
        window.location.href = '/login';
    } else {
        callback();
    }
}

function authenticateLogin(nextState, replaceState, callback) {
    if (localStorage.getItem('access_token') !== null) {
        window.location.href = '/';
    } else {
        callback();
    }
}

ReactDOM.render(
    <Provider store={store}>
        {/* <Router history={browserHistory} routes={routes} /> */}
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} onEnter={authenticate} />
                <Route path="products" component={ProductPage} onEnter={authenticate} />
                <Route path="product" component={AddProduct} onEnter={authenticate} />
                <Route path="product/:id" component={AddProduct} onEnter={authenticate} />

                <Route path="categories" component={CategoryPage} onEnter={authenticate} />
                <Route path="category" component={AddCategory} onEnter={authenticate} />
                <Route path="category/:id" component={AddCategory} onEnter={authenticate} />

                <Route path="categoriesnews" component={CategoryNewsPage} onEnter={authenticate} />
                <Route path="categorynews" component={AddCategoryNews} onEnter={authenticate} />
                <Route path="categorynews/:id" component={AddCategoryNews} onEnter={authenticate} />

                <Route path="news" component={NewsPage} onEnter={authenticate} />
                <Route path="news-edit" component={AddNewsPage} onEnter={authenticate} />
                <Route path="news-edit/:id" component={AddNewsPage} onEnter={authenticate} />

                <Route path="configuration" component={ConfigurationPage} onEnter={authenticate} />
            </Route>

            <Route component={LoginContainer}>
                <Route path='/login' component={LoginPage} onEnter={authenticateLogin} />
            </Route>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
