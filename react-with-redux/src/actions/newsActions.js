import axios from 'axios';
import {
    LOAD_NEWS_SUCCESS,
    GET_NEWS_SUCCESS
} from './actionTypes';
import { PAGE_INDEX, PAGE_SIZE } from '../commons/common';

export function loadNewsSuccess(news) {
    return { type: LOAD_NEWS_SUCCESS, news };
}

export function getByIdSuccess(newsItem) {
    return {
        type: GET_NEWS_SUCCESS, newsItem
    }
}

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

export function search(keyword, pageIndex, pageSize) {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/news?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '')
            .then((response) => {
                let data = {
                    data: response.data,
                    pageIndex
                };

                dispatch(loadNewsSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function getById(id) {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/news/' + id)
            .then((response) => {
                let data = response.data;
                dispatch(getByIdSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function saveNews(item) {
    return function (dispatch) {
        return axios.post('http://localhost:49320/api/news', item)
            .then((response) => {
                if (response.data.status) {
                    dispatch(search("", PAGE_INDEX, PAGE_SIZE));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function deleteNews(id) {
    return function (dispatch) {
        axios.post('http://localhost:49320/api/news/delete/' + id)
            .then((response) => {
                if (response.data.status) {
                    dispatch(search("", PAGE_INDEX, PAGE_SIZE));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function updateNews(item) {
    return function (dispatch) {
        return axios.post('http://localhost:49320/api/news/update', item)
            .then(function (response) {
                if (response.data.status) {
                    dispatch(search("", PAGE_INDEX, PAGE_SIZE));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
