import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// css
import '../../../node_modules/toastr/build/toastr.min.css';

// js.
import axios from 'axios';
import $ from 'jquery';
import toastr from 'toastr';
import 'jquery-validation';

// actions.
import * as productActions from '../../actions/productActions';
import * as categoryActions from '../../actions/categoryActions';
import * as supplierActions from '../../actions/supplierActions';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: 0,
            productName: '',
            quantityPerUnit: '',
            unitPrice: 0,
            supplier: '',
            category: '',
            image: ''
        }

        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        $(function () {
            $("form[name='editProduct']").validate({
                rules: {
                    name: "required",
                    supplierId: "required",
                    categoryId: "required",
                    quantity: {
                        required: true,
                        min: 1,
                        number: true
                    },
                    price: {
                        required: true,
                        min: 0,
                        number: true
                    }
                },
                submitHandler: function (form) {
                    form.submit();
                }
            });
        });

        this.props.supplierActions.loadSupplierAll();
        this.props.categoryActions.loadCategoryAll();

        if (this.props.productId !== undefined) {
            this.props.productActions.getByProductId(this.props.productId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.product !== undefined) {
            let data = this.props.product;

            this.setState({
                productID: data.ProductID,
                productName: data.ProductName,
                quantityPerUnit: data.QuantityPerUnit,
                unitPrice: data.UnitPrice,
                supplier: data.SupplierID,
                category: data.CategoryID,
                image: data.Image
            });
        }
    }

    handleChangeSupplier(event) {
        this.setState({ supplier: event.target.value });
    }

    handleChangeCategory(event) {
        this.setState({ category: event.target.value });
    }

    handleChangeProductName(event) {
        this.setState({ productName: event.target.value });
    }

    handleChangeQuantityPerUnit(event) {
        this.setState({ quantityPerUnit: event.target.value });
    }

    handleChangeUnitPrice(event) {
        this.setState({ unitPrice: event.target.value });
    }

    onSave(event) {
        event.preventDefault();

        if (!$('#editProduct').valid()) {
            return;
        }

        const product = {
            ProductID: this.state.productID,
            ProductName: this.state.productName,
            SupplierID: this.state.supplier,
            CategoryID: this.state.category,
            QuantityPerUnit: this.state.quantityPerUnit,
            UnitPrice: this.state.unitPrice,
            UnitsInStock: 0,
            UnitsOnOrder: 0,
            ReorderLevel: 0,
            Type: 0,
            Image: this.state.image
        };

        if (product.ProductID !== 0) {
            this.props.productActions.updateProduct(product)
                .then(() => {
                    toastr.success("Cập nhật thành công");
                    this.redirect();
                })
                .catch(error => {
                    toastr.error(error);
                });
        }
        else {
            this.props.productActions.saveProduct(product)
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
        this.context.router.push('/products');
    }

    goBack() {
        // this.props.history.goBack();
        this.context.router.push('/products');
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        // data.append('name', 'some value user types');
        // data.append('description', 'some value user types');
        axios.post('http://192.168.100.200:88/api/upload/image',
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
            }, data).then((response) => {
                console.log(response);
                this.setState({ image: response.data });
            });
    }

    render() {
        const { categories, suppliers } = this.props;

        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">
                            Thêm mới sản phẩm
                            <small><i className="fa fa-arrow-circle-left"></i>
                                <a href="javascript:void(0)" onClick={this.goBack.bind(this)}>Back to list</a>
                            </small>
                        </h1>
                    </div>
                </div>
                <form className="form-horizontal" name="editProduct" id="editProduct">
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Product name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="name" id="name" type="text" value={this.state.productName} onChange={this.handleChangeProductName.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Supplier:</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="supplierId" id="supplierId" value={this.state.supplier} onChange={this.handleChangeSupplier.bind(this)}>
                                <option value="">
                                    Choosen supplier
                                </option>
                                {suppliers.map((item, key) => {
                                    return (
                                        <option key={key} value={item.SupplierID}>{item.ContactName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Category:</label>
                        <div className="col-sm-10">
                            <select className="form-control" name="categoryId" id="categoryId" value={this.state.category} onChange={this.handleChangeCategory.bind(this)}>
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
                        <label className="col-sm-2 col-md-2 control-label">Quantity per unit:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="quantity" id="quantity" value={this.state.quantityPerUnit} onChange={this.handleChangeQuantityPerUnit.bind(this)} type="text" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Unit price:</label>
                        <div className="col-sm-10">
                            <input className="form-control" name="price" id="price" type="text" value={this.state.unitPrice} onChange={this.handleChangeUnitPrice.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Image:</label>
                        <div className="col-sm-4">
                            {(this.state.image === '' || this.state.image === null ? '' :
                                <img src={"http://192.168.100.200:88/" + this.state.image} alt="img-product" class="img-circle" width="100" height="100" />)}
                            <input type="file" onChange={this.handleUploadFile} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10 col-sm-offset-2">
                            <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

AddProduct.contextTypes = {
    router: PropTypes.object
};

function mapStateToProp(state, ownProps) {
    const productId = ownProps.params.id;

    return {
        productId: productId,
        product: state.products.product,
        categories: state.categories.length === 0 ? [] : state.categories.categories,
        suppliers: state.suppliers
    };
}

function mapDispatchToProp(dispatch) {
    return {
        productActions: bindActionCreators(productActions, dispatch),
        categoryActions: bindActionCreators(categoryActions, dispatch),
        supplierActions: bindActionCreators(supplierActions, dispatch)
    };
}

export default connect(mapStateToProp, mapDispatchToProp)(AddProduct);