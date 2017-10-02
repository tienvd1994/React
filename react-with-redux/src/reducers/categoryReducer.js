import {
    LOAD_CATEGORY_ALL_SUCCESS,
    LOAD_CATEGORY_SUCCESS,
    GET_CATEGORY_SUCCESS,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS
} from './../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categoriesState, action) {
    switch (action.type) {
        case LOAD_CATEGORY_ALL_SUCCESS:
            debugger;
            return { ...state, categories: action.categories };

        case LOAD_CATEGORY_SUCCESS:
            debugger;
            return {
                categories: action.categories.data.items,
                totalItems: action.categories.data.totalItems,
                pageIndex: action.categories.pageIndex
            };

        case CREATE_CATEGORY_SUCCESS:
            return action.categories;

        case UPDATE_CATEGORY_SUCCESS:
            return action.categories;

        case DELETE_CATEGORY_SUCCESS:
            return action.categories;

        case GET_CATEGORY_SUCCESS:
            return { ...state, category: action.category };

        default:
            return state;
    }
}