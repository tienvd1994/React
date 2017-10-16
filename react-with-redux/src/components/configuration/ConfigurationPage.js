import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as settingActions from './../../actions/settingActions';

// css.
import '../../../node_modules/toastr/build/toastr.min.css';

// js.
import axios from 'axios';
import $ from 'jquery';
import toastr from 'toastr';
import 'jquery-validation';

class ConfigurationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            facebookUrl: '',
            skypeUrl: '',
            title: '',
            keywords: '',
            description: ''
        };

        this.handleChangeFacebook = this.handleChangeFacebook.bind(this);
        this.handleChangeSkype = this.handleChangeSkype.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        this.props.actions.loadSettings();
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        let setting = nextProps.setting.setting;

        this.setState({
            logo: setting.Logo,
            facebookUrl: setting.FacebookUrl,
            skypeUrl: setting.SkypeUrl,
            title: setting.Title,
            keywords: setting.Keyword,
            description: setting.Description
        });
    }

    handleChangeFacebook(event) {
        this.setState({ facebookUrl: event.target.value });
    }

    handleChangeSkype(event) {
        this.setState({ skypeUrl: event.target.value });
    }

    handleChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    handleChangeKeyword(event) {
        this.setState({ keywords: event.target.value });
    }

    handleChangeDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        axios.post('http://192.168.100.200:88/api/upload/image', data,
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
            }).then((response) => {
                this.setState({ logo: response.data });
            });
    }

    onSave(event) {
        event.preventDefault();

        if (!$('#editForm').valid()) {
            return;
        }

        let setting = {
            Logo: this.state.logo,
            FacebookUrl: this.state.facebookUrl,
            SkypeUrl: this.state.skypeUrl,
            Title: this.state.title,
            Keyword: this.state.keywords,
            Description: this.state.description
        }

        this.props.actions.saveSetting(setting)
            .then(() => {
                toastr.success("Cập nhật thành công");
            })
            .catch(error => {
                toastr.error(error);
            });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Cài đặt chung</h1>
                    </div>
                </div>
                <form className="form-horizontal" id="editForm">
                    <div className="panel-group">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Thông tin chung</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 col-md-2 control-label">Logo:</label>
                                    <div className="col-sm-4">
                                        {(this.state.logo === '' || this.state.logo === null ? '' :
                                            <img src={"http://192.168.100.200:88/" + this.state.logo} alt="img-product" height="80" />)}
                                        <input type="file" onChange={this.handleUploadFile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Mạng xã hội</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 col-md-2 control-label">Facebook:</label>
                                    <div className="col-sm-4">
                                        <input type="text" name="facebook" id="facebook" value={this.state.facebookUrl} onChange={this.handleChangeFacebook} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-md-2 control-label">Skype:</label>
                                    <div className="col-sm-4">
                                        <input type="text" name="skype" id="skype" value={this.state.skypeUrl} className="form-control" onChange={this.handleChangeSkype} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">SEO</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label className="col-sm-2 col-md-2 control-label">Default page title:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleChangeTitle} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-md-2 control-label">Default meta keywords:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" value={this.state.keywords} onChange={this.handleChangeKeyword} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2 col-md-2 control-label">Default meta description	:</label>
                                    <div className="col-sm-4">
                                        <input type="text" className="form-control" value={this.state.description} onChange={this.handleChangeDescription} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <button type="button" className="btn btn-primary" onClick={this.onSave}>Lưu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProp(state, ownProps) {
    return {
        setting: state.setting
    };
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(settingActions, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(ConfigurationPage);

