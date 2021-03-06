import axios from 'axios';
import {
    LOAD_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    GET_PRODUCT_SUCCESS
} from './actionTypes';

export function loadProductsSuccess(products) {
    return { type: LOAD_PRODUCTS_SUCCESS, products };
}

export function updateProductSuccess(product) {
    return { type: UPDATE_PRODUCT_SUCCESS, product };
}

export function createProductSuccess(product) {
    return { type: CREATE_PRODUCT_SUCCESS, product };
}

export function deleteProductSuccess(product) {
    return { type: DELETE_PRODUCT_SUCCESS, product };
}

export function getByProductIdSuccess(product) {
    return { type: GET_PRODUCT_SUCCESS, product };
}

let authorization = 'Bearer ' + localStorage.getItem('access_token');

export function loadProducts(keyword, pageIndex, pageSize) {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/Products?keyword=' + keyword + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize + '',
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                let data = {
                    data: response.data,
                    pageIndex
                };

                dispatch(loadProductsSuccess(data));
            })
            .catch((error) => {
                throw (error);
            });
    }
}

export function saveProduct(product) {
    return function (dispatch) {
        return axios.post('http://192.168.100.200:88/api/Products', product,
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                if (response.data.status) {
                    // dispatch(createProductSuccess(response.status));
                    dispatch(loadProducts("", 1, 20));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function deleteProduct(id) {
    return function (dispatch) {
        axios.post('http://192.168.100.200:88/api/product/delete/' + id,
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                if (response.data.status) {
                    // dispatch(deleteProductSuccess(response));
                    dispatch(loadProducts("", 1, 20));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function updateProduct(product) {
    return function (dispatch) {
        return axios.post('http://192.168.100.200:88/api/product/update', product,
            {
                headers: { 'Authorization': authorization }
            })
            .then(function (response) {
                if (response.data.status) {
                    dispatch(loadProducts("", 1, 20));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function getByProductId(id) {
    return function (dispatch) {
        return axios.get('http://192.168.100.200:88/api/Products/' + id, "",
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                let data = response.data;
                dispatch(getByProductIdSuccess(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}