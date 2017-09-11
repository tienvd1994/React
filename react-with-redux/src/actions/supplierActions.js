import axios from 'axios';
import { LOAD_SUPPLIER_ALL_SUCCESS } from './actionTypes';

export function loadSupplierAllSuccess(suppliers) {
    return { type: LOAD_SUPPLIER_ALL_SUCCESS, suppliers };
}

export function loadSupplierAll() {
    return function (dispatch) {
        return axios.get('http://localhost:49320/api/Suppliers')
            .then(function (response) {
                let data = response.data;
                dispatch(loadSupplierAllSuccess(data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}