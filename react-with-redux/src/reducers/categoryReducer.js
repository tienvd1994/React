import { LOAD_CATEGORY_ALL_SUCCESS } from './../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categoriesState, action) {
    switch (action.type) {
        case LOAD_CATEGORY_ALL_SUCCESS:
            return action.categories;

        default:
            return state;
    }
}