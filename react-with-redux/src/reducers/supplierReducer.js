import initialState from './initialState';
import { LOAD_SUPPLIER_ALL_SUCCESS } from '../actions/actionTypes';

export default function supplierReducer(state = initialState.supplierState, action) {
    switch (action.type) {
        case LOAD_SUPPLIER_ALL_SUCCESS:
            return action.suppliers;

        default:
            return state;
    }
}