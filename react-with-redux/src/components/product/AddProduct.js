import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../../node_modules/toastr/build/toastr.min.css';
import $ from 'jquery';
import toastr from 'toastr';
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
            category: ''
        }

        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        this.props.supplierActions.loadSupplierAll();
        this.props.categoryActions.loadCategoryAll();
        this.props.productActions.getByProductId(this.props.productId);
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if (this.props.product != undefined) {
            let data = this.props.product;

            this.setState({
                productID: data.ProductID,
                productName: data.ProductName,
                quantityPerUnit: data.QuantityPerUnit,
                unitPrice: data.UnitPrice,
                supplier: data.SupplierID,
                category: data.CategoryID
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
            Type: 0
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

    render() {
        const { categories, suppliers } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-primary" onClick={this.goBack.bind(this)}>Back to list</button>
                    </div>
                </div>
                <h1>Add new product</h1>
                <form className="form-horizontal" role="form">
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Product name:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.productName} onChange={this.handleChangeProductName.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Supplier:</label>
                        <div className="col-sm-10">
                            <select className="form-control" value={this.state.supplier} onChange={this.handleChangeSupplier.bind(this)}>
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
                            <select className="form-control" value={this.state.category} onChange={this.handleChangeCategory.bind(this)}>
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
                            <input className="form-control" value={this.state.quantityPerUnit} onChange={this.handleChangeQuantityPerUnit.bind(this)} type="text" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 col-md-2 control-label">Unit price:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.unitPrice} onChange={this.handleChangeUnitPrice.bind(this)} />
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

// function getProductById(products, id) {
//     debugger;
//     const course = products.filter(product => product.ProductID == id);

//     if (course) {
//         return course[0];
//     }

//     return null;
// }

function mapStateToProp(state, ownProps) {
    const productId = ownProps.params.id;
    // let product = {};

    // if (productId) {
    //     product = getProductById((state.products == undefined || state.products.length === 0) ? state.products : state.products.products, productId);
    // }

    return {
        productId: productId,
        product: state.products.product,
        categories: state.categories,
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