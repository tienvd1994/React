import AuthorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusAction';

export function loadAuthorsSuccess(authors) {
    return { type: 'LOAD_AUTHORS_SUCCESS', authors };
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors))
        }).catch(error => {
            throw (error);
        });
    }
}