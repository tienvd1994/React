import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';
import 'jquery-validation';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRemember = this.handleRemember.bind(this);
    }

    componentDidMount() {
        $(function () {
            $("form[name='login']").validate({
                rules: {
                    username: "required",
                    password: "required",
                },
                submitHandler: function (form) {
                    form.submit();
                }
            });
        });
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleRemember(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ remember: value });
    }

    handleLogin(event) {
        event.preventDefault();

        if (!$('#login').valid()) {
            return;
        }

        axios.post('http://localhost:49320/Token', `grant_type=password&username=${this.state.username}&password=${this.state.password}`)
            .then((response) => {
                if (response.statusText === "OK") {
                    // sessionStorage.setItem('access_token', response.data.access_token);

                    // if (this.state.remember) {
                    //     localStorage.setItem('access_token', response.data.access_token);
                    // }

                    localStorage.setItem('access_token', response.data.access_token);
                    this.context.router.push('/');

                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Please Sign In</h3>
                    </div>
                    <div className="panel-body">
                        <form role="form" name="login" id="login">
                            <fieldset>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Username" name="username" id="username" value={this.state.username} onChange={this.handleUsername} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.handlePassword} />
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" checked={this.state.remember} onChange={this.handleRemember} />Remember Me
                                    </label>
                                </div>
                                <a href="javascript:;" onClick={this.handleLogin} className="btn btn-lg btn-success btn-block">Login</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: PropTypes.object
};

export default LoginPage;
