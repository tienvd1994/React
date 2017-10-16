import axios from 'axios';
import {
    LOAD_CATEGORY_ALL_SUCCESS,
    LOAD_CATEGORY_SUCCESS,
    GET_CATEGORY_SUCCESS
} from './actionTypes';

export function loadCategoryAllSuccess(categories) {
    return { type: LOAD_CATEGORY_ALL_SUCCESS, categories };
}

export function loadCategoriesSuccess(categories) {
    return { type: LOAD_CATEGORY_SUCCESS, categories };
}

export function getByCategoryIdSuccess(category) {
    return {
        type: GET_CATEGORY_SUCCESS, category
    }
}

let authorization = 'Bearer ' + localStorage.getItem('access_token');

export function loadCategoryAll() {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/Categories',
            {
                'headers': {
                    'Authorization': authorization
                }
            })
            .then(response => {
                let data = response.data;
                dispatch(loadCategoryAllSuccess(data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function loadCategories(keyword, pageIndex, pageSize) {
    return function (dispatch) {

        return axios.get('http://192.168.100.200:88/api/Categories?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '',
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                let data = {
                    data: response.data,
                    pageIndex
                };

                dispatch(loadCategoriesSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function getByCategoryId(id) {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/Categories/' + id,
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
        return axios.post('http://192.168.100.200:88/api/Categories', category,
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                if (response.data.status) {
                    dispatch(loadCategories("", 1, 20));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function deleteCategory(id) {
    return function (dispatch) {
        axios.post('http://192.168.100.200:88/api/category/delete/' + id, "",
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                if (response.data.status) {
                    dispatch(loadCategories("", 1, 20));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function updateCategory(category) {
    return function (dispatch) {
        return axios.post('http://192.168.100.200:88/api/category/update', category, {
            headers: { 'Authorization': authorization }
        })
            .then(function (response) {
                if (response.data.status) {
                    dispatch(loadCategories("", 1, 20));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
