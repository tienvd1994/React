import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
import suppliers from './supplierReducer';
import categoriesNews from './categoriesNewsReducer';
import news from './newsReducer';

const rootReducer = combineReducers({
    products,
    categories,
    suppliers,
    categoriesNews,
    news
});

export default rootReducer;