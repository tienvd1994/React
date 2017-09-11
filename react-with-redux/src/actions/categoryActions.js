import axios from 'axios';
import { LOAD_CATEGORY_ALL_SUCCESS } from './actionTypes';

export function loadCategoryAllSuccess(categories) {
    return { type: LOAD_CATEGORY_ALL_SUCCESS, categories };
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