import {
    LOAD_SETTING_SUCCESS
} from './../actions/actionTypes.js';

export default function settingReducer(state = { setting: {} }, action) {
    switch (action.type) {
        case LOAD_SETTING_SUCCESS:
            return {
                setting: action.setting,
            };

        default:
            return state;
    }
}