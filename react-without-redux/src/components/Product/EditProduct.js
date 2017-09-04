import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import toastr from 'toastr';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: 0,
            productName: '',
            quantityPerUnit: '',
            unitPrice: 0,
            supplier: '',
            category: '',
            suppliers: [],
            categorys: []
        }
    }

    componentDidMount() {
        let self = this;
        axios.get('http://192.168.100.200:88/api/Products/' + this.props.match.params.id)
            .then(function (response) {
                let data = response.data;
                self.setState({
                    productID: data.ProductID,
                    productName: data.ProductName,
                    quantityPerUnit: data.QuantityPerUnit,
                    unitPrice: data.UnitPrice,
                    supplier: data.SupplierID,
                    category: data.CategoryID
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://192.168.100.200:88/api/Suppliers')
            .then(function (response) {
                let data = response.data;
                self.setState({ suppliers: data });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://192.168.100.200:88/api/Categories')
            .then(function (response) {
                let data = response.data;
                self.setState({ categorys: data });
            })
            .catch(function (error) {
                console.log(error);
            });
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

    goBack() {
        this.props.history.goBack();
    }

    onEdit() {
        let self = this;
        axios.post('http://192.168.100.200:88/api/product/update',
            {
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
            })
            .then(function (response) {
                if (response.status) {
                    toastr.success("Update record successfully.");
                    self.props.history.goBack();
                    return;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                <h1>Edit product</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-primary" onClick={this.goBack.bind(this)}>Back to list</button>
                    </div>
                </div>
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
                                {this.state.suppliers.map(function (item, key) {
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
                                {this.state.categorys.map(function (item, key) {
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
                            <button type="button" className="btn btn-primary" onClick={this.onEdit.bind(this)}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProduct;