import axios from 'axios';
import {
    LOAD_SETTING_SUCCESS,
} from './actionTypes';

export function loadSettingSuccess(setting) {
    return { type: LOAD_SETTING_SUCCESS, setting };
}

let authorization = 'Bearer ' + localStorage.getItem('access_token');

export function loadSettings() {
    return function (dispatch) {
        axios.defaults.headers.common['Authorization'] = authorization;
        return axios.get('http://192.168.100.200:88/api/Settings')
            .then(response => {
                let data = response.data.settingViewModel;
                dispatch(loadSettingSuccess(data));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function saveSetting(setting) {
    return function (dispatch) {
        return axios.post('http://192.168.100.200:88/api/Settings', setting,
            {
                headers: { 'Authorization': authorization }
            })
            .then((response) => {
                if (response.data.status) {
                    dispatch(loadSettings());
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}