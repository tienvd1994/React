import { combineReducers } from 'redux';
import products from './productReducer';
import categories from './categoryReducer';
import suppliers from './supplierReducer';

const rootReducer = combineReducers({
    products,
    categories,
    suppliers
});

export default rootReducer;