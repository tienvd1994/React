import {
    LOAD_NEWS_SUCCESS,
    GET_NEWS_SUCCESS
} from './../actions/actionTypes.js';

export default function newsReducer(state = { news: [], totalItems: 0, pageIndex: 1 }, action) {
    switch (action.type) {
        case LOAD_NEWS_SUCCESS:
            return {
                news: action.news.data.items,
                totalItems: action.news.data.totalItems,
                pageIndex: action.news.pageIndex
            };

        case GET_NEWS_SUCCESS:
            debugger;
            return { ...state, newsItem: action.newsItem };

        default:
            return state;
    }
}