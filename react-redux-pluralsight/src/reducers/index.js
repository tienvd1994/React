import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxStatusReducer from './ajaxStatusReducer';
import '../../node_modules/toastr/build/toastr.min.css';

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxStatusReducer
});

export default rootReducer;