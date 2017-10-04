import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';

class LoginContainer extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LoginContainer;
