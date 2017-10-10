import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as categoryActions from './../../actions/categoryActions';

import Pagination from 'react-js-pagination';
import '../../../node_modules/toastr/build/toastr.min.css';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import toastr from 'toastr';
import swal from 'sweetalert';
import { PAGE_INDEX, PAGE_SIZE } from '../../commons/common';

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.props.actions.loadCategories("", PAGE_INDEX, PAGE_SIZE);
        this.state = {
            pageIndex: 1
        };
    }

    handleSearch(event) {
        let keyword = event.target.value;
        this.props.actions.loadCategories(keyword, PAGE_INDEX, PAGE_SIZE);
    }

    handlePageChange(pageNumber) {
        this.setState({ pageIndex: pageNumber });
        this.props.actions.loadCategories("", pageNumber, PAGE_SIZE);
    }

    onDelete(item) {
        let self = this;

        swal({
            title: "Xác nhận sửa",
            text: "Bạn có chắc chắn muốn lưu thông tin không?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Không",
            closeOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                self.props.actions.deleteCategory(item.CategoryID);
                toastr.success("Xóa thành công");
            }
        });
    }

    render() {
        const { categories, totalItems, pageIndex } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách nhóm sản phẩm</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Link className="btn btn-primary" to="/category">Thêm mới</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Nhập tên nhóm" onChange={this.handleSearch.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Tên nhóm</th>
                                    <th className="text-center">Nhóm cha</th>
                                    <th className="text-center">Trạng thái</th>
                                    <th className="text-center">Sửa/Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, key) => {
                                    return (
                                        <tr key={category.CategoryID}>
                                            <td className="text-center">{PAGE_SIZE * (this.state.pageIndex - 1) + key + 1}</td>
                                            <td>{category.CategoryName}</td>
                                            <td>{category.ParentId}</td>
                                            {console.log(category.Published)}
                                            <td>
                                                <span className={category.Published === true ? "label label-success" : "label label-danger"}>
                                                    {category.Published === true ? "Đang dùng" : "Không dùng"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <Link to={`/category/${category.CategoryID}`} className="btn green btn-outline btn-sm">
                                                    <i className="glyphicon glyphicon-edit"></i>
                                                </Link>
                                                <a href="javascript:void(0)" className="btn green btn-outline btn-sm" onClick={this.onDelete.bind(this, category)}>
                                                    <i className="glyphicon glyphicon-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                }
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            activePage={pageIndex}
                            itemsCountPerPage={PAGE_SIZE}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={50}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

CategoryPage.propTypes = {
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProp(state, ownProps) {
    return {
        categories: state.categories.length === 0 ? [] : state.categories.categories,
        totalItems: state.categories.length === 0 ? 0 : state.categories.totalItems,
        pageIndex: state.categories.length === 0 ? [] : state.categories.pageIndex
    };
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(categoryActions, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(CategoryPage);
