import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as newsActions from './../../actions/newsActions';

import Pagination from 'react-js-pagination';
import '../../../node_modules/toastr/build/toastr.min.css';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import toastr from 'toastr';
import swal from 'sweetalert';
import { PAGE_INDEX, PAGE_SIZE } from '../../commons/common';

class NewsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1
        };
    }

    componentDidMount() {
        this.props.newsActions.search("", PAGE_INDEX, PAGE_SIZE);
    }

    handleSearch(event) {
        let keyword = event.target.value;
        this.props.newsActions.search(keyword, PAGE_INDEX, PAGE_SIZE);
    }

    handlePageChange(pageNumber) {
        this.setState({ pageIndex: pageNumber });
        this.props.newsActions.search("", pageNumber, PAGE_SIZE);
    }

    onDelete(item) {
        let self = this;

        swal({
            title: "Xác nhận sửa",
            text: "Bạn có chắc chắn muốn xóa không?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Không",
            closeOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                self.props.newsActions.deleteNews(item.Id);
                toastr.success("Xóa thành công");
            }
        });
    }

    render() {
        const { news, totalItems, pageIndex } = this.props;

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
                                    <th className="text-center">#</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Trạng thái</th>
                                    <th className="text-center">Sửa/Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map((item, key) => {
                                    return (
                                        <tr key={item.Id}>
                                            <td className="text-center">{PAGE_SIZE * (this.state.pageIndex - 1) + key + 1}</td>
                                            <td>{item.Title}</td>
                                            <td>
                                                <span className={item.Published === true ? "label label-success" : "label label-danger"}>
                                                    {item.Published === true ? "Đang dùng" : "Không dùng"}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <Link to={`/news-edit/${item.Id}`} className="btn green btn-outline btn-sm">
                                                    <i className="glyphicon glyphicon-edit"></i>
                                                </Link>
                                                <a href="javascript:;" className="btn green btn-outline btn-sm" onClick={this.onDelete.bind(this, item)}>
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

NewsPage.propTypes = {
    newsActions: PropTypes.object.isRequired
}

function mapStateToProp(state, ownProps) {
    return {
        news: state.news.length === 0 ? [] : state.news.news,
        totalItems: state.news.length === 0 ? 0 : state.news.totalItems,
        pageIndex: state.news.length === 0 ? [] : state.news.pageIndex
    };
}

function mapDispatchToProp(dispatch) {
    return {
        newsActions: bindActionCreators(newsActions, dispatch)
    };
}


export default connect(mapStateToProp, mapDispatchToProp)(NewsPage);

