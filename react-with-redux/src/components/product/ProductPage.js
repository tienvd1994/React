import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productsAction from './../../actions/productActions';
import { PAGE_INDEX, PAGE_SIZE } from '../../commons/common';
import { Link } from 'react-router';
import Pagination from 'react-js-pagination';
import '../../../node_modules/toastr/build/toastr.min.css';
import '../../../node_modules/sweetalert/dist/sweetalert.css';
import toastr from 'toastr';
import swal from 'sweetalert';

class ProductPage extends Component {
    constructor(props) {
        debugger;
        super(props);
        if (props.products === undefined) {
            this.props.actions.loadProducts("", PAGE_INDEX, PAGE_SIZE);
        }

        this.state = {
            pageIndex: 1
        };
    }

    componentDidMount() {
        this.props.actions.loadProducts("", PAGE_INDEX, PAGE_SIZE);
    }

    handleSearch(event) {
        let keyword = event.target.value;
        this.props.actions.loadProducts(keyword, PAGE_INDEX, PAGE_SIZE);
    }

    handlePageChange(pageNumber) {
        this.setState({ pageIndex: pageNumber });
        this.props.actions.loadProducts("", pageNumber, PAGE_SIZE);
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
                self.props.actions.deleteProduct(item.ProductID);
                toastr.success("Xóa thành công");
            }
        });
    }

    render() {
        const { products, totalItems, pageIndex } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="page-header">Danh sách sản phẩm</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Link className="btn btn-primary" to="/product">Thêm mới</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Nhập tên sản phẩm" onChange={this.handleSearch.bind(this)} />
                        </div>
                    </div>
                </div>
                {/* <ProductList products={products} /> */}
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Tên sản phẩm</th>
                                    <th className="text-center">Số lượng</th>
                                    <th className="text-center">Giá</th>
                                    <th className="text-center">Sửa/Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, key) => {
                                    return (
                                        <tr key={product.ProductID}>
                                            <td className="text-center">{PAGE_SIZE * (this.state.pageIndex - 1) + key + 1}</td>
                                            <td>{product.ProductName}</td>
                                            <td>{product.QuantityPerUnit}</td>
                                            <td>{product.UnitPrice} $</td>
                                            <td className="text-center">
                                                <Link to={`/product/${product.ProductID}`} className="btn green btn-outline btn-sm">
                                                    <i className="glyphicon glyphicon-edit"></i>
                                                </Link>
                                                <a href="javascript:void(0)" className="btn green btn-outline btn-sm" onClick={this.onDelete.bind(this, product)}>
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

ProductPage.propTypes = {
    products: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

ProductPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProp(state, ownProps) {
    return {
        products: (state.products === undefined || state.products.length === 0) ? state.products : state.products.products,
        totalItems: (state.products === undefined || state.products.length === 0) ? 0 : state.products.totalItems,
        pageIndex: (state.products === undefined || state.products.length === 0) ? 1 : state.products.pageIndex
    };
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(productsAction, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(ProductPage);