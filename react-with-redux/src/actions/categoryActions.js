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

export function loadCategoryAll() {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/Categories')
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
        return axios.get('http://localhost:49320/api/Categories?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '')
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
        return axios.get('http://localhost:49320/api/Categories/' + id)
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
        return axios.post('http://localhost:49320/api/Categories', category)
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
        axios.post('http://localhost:49320/api/category/delete/' + id)
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
        return axios.post('http://localhost:49320/api/category/update', category)
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
