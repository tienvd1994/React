import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
import suppliers from './supplierReducer';
import categoriesNews from './categoriesNewsReducer';

const rootReducer = combineReducers({
    products,
    categories,
    suppliers,
    categoriesNews
});

export default rootReducer;