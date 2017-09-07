export default function courseReducer(state = [], action) {
    switch (action.type) {
        case 'CREATE_COURSE_SUCCESS':
            return [...state,
            Object.assign({}, action.course)
            ];

        case 'UPDATE_COURSE_SUCCESS':
            return [...state.filter(course => course.id !== action.course.id),
            Object.assign({}, action.course)
            ];

        case 'LOAD_COURSES_SUCCESS':
            return action.courses;

        default:
            return state;
    }
}