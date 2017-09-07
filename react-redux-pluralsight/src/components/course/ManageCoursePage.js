import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseAction from './../../actions/courseAction';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.saveCourse = this.saveCourse.bind(this);
        this.updateCourseState = this.updateCourseState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;

        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
            });
    }

    redirect() {
        this.setState({ saving: false });
        this.context.router.push('/courses');
    }

    render() {
        const { courses } = this.props;

        return (
            <div>
                <CourseForm course={this.state.course}
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
}

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course) {
        return course[0];
    }

    return null;
}

function mapStateToProp(state, ownProps) {
    const courseId = ownProps.params.id;

    let course = {
        id: '',
        watchHref: '',
        title: '',
        authorId: '',
        length: '',
        category: ''
    };

    if (courseId) {
        course = getCourseById(state.courses, courseId);
    }

    const authorFormatForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorFormatForDropdown
    };
}

function mapDispatchToProp(dispatch) {
    return {
        // createCourse: course => dispatch(courseAction.createCourse(course))
        actions: bindActionCreators(courseAction, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(ManageCoursePage);
