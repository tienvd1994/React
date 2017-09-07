import CourseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';

export function createCourse(course) {
    return { type: 'CREATE_COURSE', course };
}

export function createCourseSuccess(course) {
    return { type: 'CREATE_COURSE_SUCCESS', course };
}

export function updateCourseSuccess(course) {
    return { type: 'UPDATE_COURSE_SUCCESS', course };
}

export function loadCoursesSuccess(courses) {
    return { type: 'LOAD_COURSES_SUCCESS', courses };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return CourseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses))
        }).catch(error => {
            throw (error);
        });
    }
}

export function saveCourse(course) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());

        return CourseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse))
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    }
}