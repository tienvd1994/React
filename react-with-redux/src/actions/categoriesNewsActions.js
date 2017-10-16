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

let authorization = 'Bearer ' + localStorage.getItem('access_token');

export function loadCategoriesNewsAll() {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/CategoriesNews',
            {
                headers: { Authorization: authorization }
            })
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
        return axios.get('http://192.168.100.200:88/api/CategoriesNews?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '',
            {
                headers: { 'Authorization': authorization }
            })
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
        return axios.get('http://192.168.100.200:88/api/CategoriesNews/' + id,
            {
                headers: { 'Authorization': authorization }
            })
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
        return axios.post('http://192.168.100.200:88/api/CategoriesNews', category,
            {
                headers: { 'Authorization': authorization }
            })
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
        axios.post('http://192.168.100.200:88/api/categoriesnews/delete/' + id, "",
            {
                headers: { 'Authorization': authorization }
            })
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
        return axios.post('http://192.168.100.200:88/api/categoriesnews/update', item,
            {
                headers: { 'Authorization': authorization }
            })
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
