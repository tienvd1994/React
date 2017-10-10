import axios from 'axios';
import {
    LOAD_CATEGORY_NEWS_ALL_SUCCESS,
    LOAD_CATEGORY_NEWS_SUCCESS,
    GET_CATEGORY_NEWS_SUCCESS
} from './actionTypes';
import { PAGE_INDEX, PAGE_SIZE } from '../commons/common';

export function loadCategoriesNewsAllSuccess(categoriesNews) {
    return { type: LOAD_CATEGORY_NEWS_ALL_SUCCESS, categoriesNews };
}

export function loadCategoriesNewsSuccess(categoriesNews) {
    return { type: LOAD_CATEGORY_NEWS_SUCCESS, categoriesNews };
}

export function getByCategoryIdSuccess(categoryNews) {
    return {
        type: GET_CATEGORY_NEWS_SUCCESS, categoryNews
    }
}

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

export function loadCategoriesNewsAll() {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/CategoriesNews')
            .then(response => {
                let data = response.data;
                dispatch(loadCategoriesNewsAllSuccess(data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function loadCategoriesNews(keyword, pageIndex, pageSize) {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/CategoriesNews?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '')
            .then((response) => {
                let data = {
                    data: response.data,
                    pageIndex
                };

                dispatch(loadCategoriesNewsSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function getById(id) {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/CategoriesNews/' + id)
            .then((response) => {
                let data = response.data;
                dispatch(getByCategoryIdSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function saveCategory(category) {
    return function (dispatch) {
        return axios.post('http://localhost:49320/api/CategoriesNews', category)
            .then((response) => {
                if (response.data.status) {
                    dispatch(loadCategoriesNews("", PAGE_INDEX, PAGE_SIZE));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function deleteCategoryNews(id) {
    return function (dispatch) {
        axios.post('http://localhost:49320/api/categoriesnews/delete/' + id)
            .then((response) => {
                if (response.data.status) {
                    dispatch(loadCategoriesNews("", PAGE_INDEX, PAGE_SIZE));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function updateCategory(item) {
    return function (dispatch) {
        return axios.post('http://localhost:49320/api/categoriesnews/update', item)
            .then(function (response) {
                if (response.data.status) {
                    dispatch(loadCategoriesNews("", PAGE_INDEX, PAGE_SIZE));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
