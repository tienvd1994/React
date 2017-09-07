import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseAction from './../../actions/courseAction';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

class CoursePage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: { title: "" }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({ course: course });
    }

    onClickSave() {
        this.props.actions.createCourse(this.state.course);
    }

    redirectToAddCoursePage() {
        browserHistory.push("/course");
    }

    render() {
        const { courses } = this.props;

        return (
            <div>
                <h1>Course Page</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}
                />
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProp(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProp(dispatch) {
    return {
        // createCourse: course => dispatch(courseAction.createCourse(course))
        actions: bindActionCreators(courseAction, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(CoursePage);
