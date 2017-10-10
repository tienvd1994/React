import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// css.
import '../../../node_modules/toastr/build/toastr.min.css';

// js.
import $ from 'jquery';
import toastr from 'toastr';
import 'jquery-validation';

import * as categoriesNewsActions from './../../actions/categoriesNewsActions';

class AddNewsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Id: 0,
            Name: '',
            Description: '',
            Status: 1
        }

        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        $(function () {
            $("form[name='editCategory']").validate({
                rules: {
                    name: "required",
                    description: "required",
                },
                submitHandler: function (form) {
                    form.submit();
                }
            });
        });

        this.props.actions.loadCategoriesNewsAll();

        if (this.props.categoryNewsId !== undefined) {
            this.props.actions.getById(this.props.categoryNewsId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoryNews !== undefined) {
            let data = nextProps.categoryNews;

            this.setState({
                Id: data.Id,
                Name: data.Name,
                Description: data.Description,
            });
        }
    }

    handleChangeName(event) {
        this.setState({ Name: event.target.value });
    }

    handleChangeDescription(event) {
        this.setState({ Description: event.target.value });
    }

    handleChangeParentId(event) {
        this.setState({ ParentId: event.target.value });
    }

    onSave(event) {
        event.preventDefault();

        if (!$('#editCategory').valid()) {
            return;
        }

        const category = {
            Id: this.state.Id,
            Name: this.state.Name,
            Description: this.state.Description,
        };

        if (category.Id !== 0) {
            this.props.actions.updateCategory(category)
                .then(() => {
                    toastr.success("Cập nhật thành công");
                    this.redirect();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
        else {
            this.props.actions.saveCategory(category)
                .then(() => {
                    toastr.success("Thêm mới thành công");
                    this.redirect();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
    }

    redirect() {
        this.context.router.push('/news');
    }

    goBack() {
        this.context.router.push('/news');
    }

    render() {
        const { categoriesNews } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">
                            Thêm mới nhóm tin tức
                            <small><i className="fa fa-arrow-circle-left"></i>
                                <a href="javascript:void(0)" onClick={this.goBack.bind(this)}>Quay lại danh sách</a>
                            </small>
                        </h1>
                    </div>
                </div>
                <form className="form-horizontal" name="editCategory" id="editCategory">
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Nhóm cha:</label>
                        <div className="col-sm-6">
                            <select className="form-control" name="parentId" id="parentId" value={this.state.ParentId} onChange={this.handleChangeParentId.bind(this)}>
                                <option value="">
                                    Choosen category
                                </option>
                                {categoriesNews.map(function (item, key) {
                                    return (
                                        <option key={key} value={item.CategoryID}>{item.CategoryName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Tên nhóm:</label>
                        <div className="col-sm-6">
                            <input className="form-control" name="name" id="name" value={this.state.Name} type="text" onChange={this.handleChangeName.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Mô tả:</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" name="description" id="description" value={this.state.Description} onChange={this.handleChangeDescription.bind(this)}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10 col-sm-offset-2">
                            <button type="button" className="btn btn-primary" onClick={this.onSave}>Lưu</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

AddNewsPage.contextTypes = {
    router: PropTypes.object
};

export default AddNewsPage;