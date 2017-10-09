import {
    LOAD_CATEGORY_NEWS_ALL_SUCCESS,
    LOAD_CATEGORY_NEWS_SUCCESS,
    GET_CATEGORY_NEWS_SUCCESS
} from './../actions/actionTypes.js';
import initialState from './initialState';

export default function categoriesNewsReducer(state = { categoriesNews: initialState.categoriesState, totalItems: 0, pageIndex: 1 }, action) {
    switch (action.type) {
        case LOAD_CATEGORY_NEWS_ALL_SUCCESS:
            return { ...state, categoriesNews: action.categoriesNews };

        case LOAD_CATEGORY_NEWS_SUCCESS:
            return {
                categoriesNews: action.categoriesNews.data.items,
                totalItems: action.categoriesNews.data.totalItems,
                pageIndex: action.categoriesNews.pageIndex
            };

        case GET_CATEGORY_NEWS_SUCCESS:
            return { ...state, categoryNews: action.categoryNews };

        default:
            return state;
    }
}