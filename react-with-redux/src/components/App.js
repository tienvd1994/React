import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import $ from 'jquery';
global.jQuery = $;
global.jquery = $;
global.$ = $;
require('bootstrap');
require('metismenu');

class App extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        // $('#side-menu').metisMenu();
        $(function () {
            $('#side-menu').metisMenu();
        });
        $(function () {
            $(window).bind("load resize", function () {
                var topOffset = 50;
                var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; // 2-row-menu
                } else {
                    $('div.navbar-collapse').removeClass('collapse');
                }

                var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
                height = height - topOffset;
                if (height < 1) height = 1;
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            });

            var url = window.location;
            // var element = $('ul.nav a').filter(function() {
            //     return this.href == url;
            // }).addClass('active').parent().parent().addClass('in').parent();
            var element = $('ul.nav a').filter(function () {
                return this.href === url;
            }).addClass('active').parent();

            while (true) {
                if (element.is('li')) {
                    element = element.parent().addClass('in').parent();
                } else {
                    break;
                }
            }
        });
    }

    onLogout(event) {
        event.preventDefault();
        localStorage.removeItem('access_token');
        this.context.router.push('/login');
    }

    render() {
        return (
            <div id="wrapper">
                <nav className="navbar navbar-default navbar-static-top" style={{ 'marginBottom': 0 }}>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">SSB Admin v2.0</Link>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
                                <i className="fa fa-envelope fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-messages">
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                <em>Yesterday</em>
                                            </span>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                <em>Yesterday</em>
                                            </span>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <strong>John Smith</strong>
                                            <span className="pull-right text-muted">
                                                <em>Yesterday</em>
                                            </span>
                                        </div>
                                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="javascript:void(0)">
                                        <strong>Read All Messages</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
                                <i className="fa fa-tasks fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-tasks">
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <p>
                                                <strong>Task 1</strong>
                                                <span className="pull-right text-muted">40% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ 'width': '40%' }}>
                                                    <span className="sr-only">40% Complete (success)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <p>
                                                <strong>Task 2</strong>
                                                <span className="pull-right text-muted">20% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ 'width': '20%' }}>
                                                    <span className="sr-only">20% Complete</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <p>
                                                <strong>Task 3</strong>
                                                <span className="pull-right text-muted">60% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ 'width': '60%' }}>
                                                    <span className="sr-only">60% Complete (warning)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <p>
                                                <strong>Task 4</strong>
                                                <span className="pull-right text-muted">80% Complete</span>
                                            </p>
                                            <div className="progress progress-striped active">
                                                <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ 'width': ' 80%' }}>
                                                    <span className="sr-only">80% Complete (danger)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="javascript:void(0)">
                                        <strong>See All Tasks</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
                                <i className="fa fa-bell fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-alerts">
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <i className="fa fa-comment fa-fw"></i> New Comment
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <i className="fa fa-twitter fa-fw"></i> 3 New Followers
                                    <span className="pull-right text-muted small">12 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <i className="fa fa-envelope fa-fw"></i> Message Sent
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <i className="fa fa-tasks fa-fw"></i> New Task
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <div>
                                            <i className="fa fa-upload fa-fw"></i> Server Rebooted
                                    <span className="pull-right text-muted small">4 minutes ago</span>
                                        </div>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a className="text-center" href="javascript:void(0)">
                                        <strong>See All Alerts</strong>
                                        <i className="fa fa-angle-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0)">
                                <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li><a href="javascript:void(0)"><i className="fa fa-user fa-fw"></i> User Profile</a>
                                </li>
                                <li><a href="javascript:void(0)"><i className="fa fa-gear fa-fw"></i> Settings</a>
                                </li>
                                <li className="divider"></li>
                                <li><a href="#" onClick={this.onLogout}><i className="fa fa-sign-out fa-fw"></i> Logout</a></li>
                            </ul>
                        </li>
                    </ul>

                    <div className="navbar-default sidebar" role="navigation">
                        <div className="sidebar-nav navbar-collapse">
                            <ul className="nav" id="side-menu">
                                <li className="sidebar-search">
                                    <div className="input-group custom-search-form">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="input-group-btn">
                                            <button className="btn btn-default" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <IndexLink to="/">
                                        <i className="fa fa-dashboard fa-fw"></i> Dashboard
                                    </IndexLink>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">
                                        <i className="fa fa-bar-chart-o fa-fw"></i> Catalog<span className="fa arrow"></span></a>
                                    <ul className="nav nav-second-level">
                                        <li>
                                            <Link to="/products">Sản phẩm</Link>
                                        </li>
                                        <li>
                                            <Link to="/categories">Nhóm sản phẩm</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><i className="fa fa-wrench fa-fw"></i> Bán hàng<span className="fa arrow"></span></a>
                                    <ul className="nav nav-second-level">
                                        <li>
                                            <a href="panels-wells.html">Đơn hàng</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><i className="fa fa-sitemap fa-fw"></i> Tin tức<span className="fa arrow"></span></a>
                                    <ul className="nav nav-second-level">
                                        <li>
                                            <Link to="/news">Tin tức</Link>
                                        </li>
                                        <li>
                                            <Link to="/categoriesnews">Nhóm tin tức</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object
};

export default App;
