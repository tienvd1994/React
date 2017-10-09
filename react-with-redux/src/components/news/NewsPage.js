import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as categoriesNewsActions from './../../actions/categoriesNewsActions';

import Pagination from 'react-js-pagination';
import '../../../node_modules/toastr/build/toastr.min.css';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import toastr from 'toastr';
import swal from 'sweetalert';
import { PAGE_INDEX, PAGE_SIZE } from '../../commons/common';

class NewsPage extends Component {
    constructor(props) {
        super(props);
        // this.props.actions.loadCategoriesNews("", PAGE_INDEX, PAGE_SIZE);
        this.state = {
            pageIndex: 1
        };
    }

    handleSearch(event) {
        let keyword = event.target.value;
        this.props.actions.loadCategoriesNews(keyword, PAGE_INDEX, PAGE_SIZE);
    }

    handlePageChange(pageNumber) {
        this.setState({ pageIndex: pageNumber });
        this.props.actions.loadCategoriesNews("", pageNumber, PAGE_SIZE);
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
                // self.props.actions.deleteCategory(item.CategoryID);
                // toastr.success("Xóa thành công");
            }
        });
    }

    render() {
        const { categoriesNews, totalItems, pageIndex } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách tin tức</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Link className="btn btn-primary" to="/news-edit">Thêm mới</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Nhập tên" onChange={this.handleSearch.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Tên nhóm</th>
                                    <th className="text-center">Trạng thái</th>
                                    <th className="text-center">Sửa/Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {categoriesNews.map((item, key) => {
                                    return (
                                        <tr key={item.Id}>
                                            <td className="text-center">{PAGE_SIZE * (this.state.pageIndex - 1) + key + 1}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.ParentCategoryId}</td>
                                            <td>
                                                <span className={item.Published === 1 ? "label label-success" : "label label-danger"}>
                                                    {item.Published === 1 ? "Đang dùng" : "Không dùng"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <Link to={`/categorynews/${item.Id}`} className="btn green btn-outline btn-sm">
                                                    <i className="glyphicon glyphicon-edit"></i>
                                                </Link>
                                                <a href="javascript:void(0)" className="btn green btn-outline btn-sm" onClick={this.onDelete.bind(this, item)}>
                                                    <i className="glyphicon glyphicon-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                }
                                )} */}
                            </tbody>
                        </table>
                        {/* <Pagination
                            activePage={pageIndex}
                            itemsCountPerPage={PAGE_SIZE}
                            totalItemsCount={this.props.totalItems}
                            pageRangeDisplayed={50}
                            onChange={this.handlePageChange.bind(this)}
                        /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsPage;

