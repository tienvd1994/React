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

let authorization = 'Bearer ' + localStorage.getItem('access_token');

export function search(keyword, pageIndex, pageSize) {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/news?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '',
            {
                headers: { 'Authorization': authorization }
            })
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
        return axios.get('http://192.168.100.200:88/api/news/' + id,
            {
                headers: { 'Authorization': authorization }
            })
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
        return axios.post('http://192.168.100.200:88/api/news', item,
            {
                headers: { 'Authorization': authorization }
            })
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
        axios.post('http://192.168.100.200:88/api/news/delete/' + id, "",
            {
                headers: { 'Authorization': authorization }
            })
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
        return axios.post('http://192.168.100.200:88/api/news/update', item,
            {
                headers: { 'Authorization': authorization }
            })
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
