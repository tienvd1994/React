import axios from 'axios';
import { LOAD_SUPPLIER_ALL_SUCCESS } from './actionTypes';

export function loadSupplierAllSuccess(suppliers) {
    return { type: LOAD_SUPPLIER_ALL_SUCCESS, suppliers };
}

let authorization = 'Bearer ' + localStorage.getItem('access_token');

export function loadSupplierAll() {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/Suppliers',
            {
                headers: { 'Authorization': authorization }
            })
            .then(function (response) {
                let data = response.data;
                dispatch(loadSupplierAllSuccess(data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}