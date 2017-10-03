import initialState from './initialState';
import {
    LOAD_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCT_SUCCESS
} from '../actions/actionTypes';

export default function productReducer(state = { products: [], totalItems: 0, pageIndex: 1 }, action) {
    switch (action.type) {
        case LOAD_PRODUCTS_SUCCESS:
            return {
                products: action.products.data.items,
                totalItems: action.products.data.totalItems,
                pageIndex: action.products.pageIndex
            };

        case CREATE_PRODUCT_SUCCESS:
            return action.products;

        case UPDATE_PRODUCT_SUCCESS:
            return action.products;

        case DELETE_PRODUCT_SUCCESS:
            return action.products;

        case GET_PRODUCT_SUCCESS:
            return { ...state, product: action.product };

        default:
            return state;
    }
}