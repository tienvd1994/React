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

import * as categoryActions from './../../actions/categoryActions';

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            CategoryID: 0,
            CategoryName: '',
            Description: '',
            ParentId: -1,
            Status: 1,
            Published: true
        }

        this.onSave = this.onSave.bind(this);
        this.handlePublished = this.handlePublished.bind(this);
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

        this.props.categoryActions.loadCategoryAll();

        if (this.props.categoryId !== undefined) {
            this.props.categoryActions.getByCategoryId(this.props.categoryId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== undefined) {
            debugger;
            let data = nextProps.category;

            this.setState({
                CategoryID: data.CategoryID,
                CategoryName: data.CategoryName,
                Description: data.Description,
                ParentId: data.ParentId,
                Status: data.Status,
                Published: data.Published
            });
        }
    }

    handleChangeCategoryName(event) {
        this.setState({ CategoryName: event.target.value });
    }

    handleChangeDescription(event) {
        this.setState({ Description: event.target.value });
    }

    handleChangeParentId(event) {
        this.setState({ ParentId: event.target.value });
    }

    handlePublished(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ Published: value });
    }

    onSave(event) {
        event.preventDefault();

        if (!$('#editCategory').valid()) {
            return;
        }

        const category = {
            CategoryID: this.state.CategoryID,
            CategoryName: this.state.CategoryName,
            Description: this.state.Description,
            ParentId: this.state.ParentId,
            Status: this.state.Status,
            Published: this.state.Published
        };

        if (category.CategoryID !== 0) {
            this.props.categoryActions.updateCategory(category)
                .then(() => {
                    toastr.success("Cập nhật thành công");
                    this.redirect();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
        else {
            this.props.categoryActions.saveCategory(category)
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
        this.context.router.push('/categories');
    }

    goBack() {
        this.context.router.push('/categories');
    }

    render() {
        const { categories } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">
                            Thêm mới nhóm sản phẩm
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
                                {categories.map(function (item, key) {
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
                            <input className="form-control" name="name" id="name" value={this.state.CategoryName} type="text" onChange={this.handleChangeCategoryName.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Mô tả:</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" name="description" id="description" value={this.state.Description} onChange={this.handleChangeDescription.bind(this)}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Trạng thái:</label>
                        <div className="col-sm-6">
                            <input name="published" type="checkbox" checked={this.state.Published} onChange={this.handlePublished} />
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

AddCategory.contextTypes = {
    router: PropTypes.object
};

function mapStateToProp(state, ownProps) {
    const categoryId = ownProps.params.id;

    return {
        categories: state.categories.length === 0 ? [] : state.categories.categories,
        categoryId: categoryId,
        category: state.categories.category
    };
}

function mapDispatchToProp(dispatch) {
    return {
        categoryActions: bindActionCreators(categoryActions, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(AddCategory);