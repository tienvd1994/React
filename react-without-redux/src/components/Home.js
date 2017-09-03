import React, { Component } from 'react';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';

import Pagination from 'react-js-pagination';
import SweetAlert from 'sweetalert-react';
import '../../node_modules/sweetalert/dist/sweetalert.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pageIndex: 1,
            pageSize: 20,
            totalItems: 0,
            show: false
        };
    }

    componentDidMount() {
        let self = this;
        axios.get('http://192.168.100.200:88/api/Products?keyword=&pageIndex=' + this.state.pageIndex + '&pageSize=' + this.state.pageSize + '')
            .then(function (response) {
                console.log(response);
                let data = response.data;
                self.setState({ data: data.items, totalItems: data.totalItems });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onDelete(item) {
        let self = this;
        this.setState({ show: true });

        axios.post('http://192.168.100.200:88/api/product/delete/' + item.ProductID)
            .then(function (response) {
                if (response.status) {
                    axios.get('http://192.168.100.200:88/api/Products?keyword=&pageIndex=' + self.state.pageIndex + '&pageSize=' + self.state.pageSize + '')
                        .then(function (response) {
                            let data = response.data;
                            self.setState({ data: data.items, totalItems: data.totalItems });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                    alert("Deleted sucessfully.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handlePageChange(pageNumber) {
        let self = this;
        axios.get('http://192.168.100.200:88/api/Products?keyword=&pageIndex=' + pageNumber + '&pageSize=' + this.state.pageSize + '')
            .then(function (response) {
                let data = response.data;
                self.setState({ data: data.items, totalItems: data.totalItems });
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({ pageIndex: pageNumber });
    }

    handleSearch(event) {
        let keyword = event.target.value;

        let self = this;
        axios.get('http://192.168.100.200:88/api/Products?keyword=' + keyword + '&pageIndex=' + this.state.pageIndex + '&pageSize=' + this.state.pageSize + '')
            .then(function (response) {
                let data = response.data;
                self.setState({ data: data.items, totalItems: data.totalItems });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container theme-showcase" role="main">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Product list</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <Link className="btn btn-primary" to="/addproduct">Add new</Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter product name" onChange={this.handleSearch.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">ProductName</th>
                                    <th className="text-center">QuantityPerUnit</th>
                                    <th className="text-center">UnitPrice</th>
                                    <th className="text-center">Sửa/Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(function (item, key) {

                                    return (
                                        <tr key={key}>
                                            <td className="text-center">{this.state.pageSize * (this.state.pageIndex - 1) + key + 1}</td>
                                            <td>{item.ProductName}</td>
                                            <td>{item.QuantityPerUnit}</td>
                                            <td>{item.UnitPrice} $</td>
                                            <td className="text-center">
                                                <Link to={`/editproduct/${item.ProductID}`} className="btn green btn-outline btn-sm">
                                                    <i className="glyphicon glyphicon-edit"></i>
                                                </Link>
                                                <a href="javascript:void(0)" className="btn green btn-outline btn-sm" onClick={this.onDelete.bind(this, item)}>
                                                    <i className="glyphicon glyphicon-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )

                                }.bind(this)
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            activePage={this.state.pageIndex}
                            itemsCountPerPage={this.state.pageSize}
                            totalItemsCount={this.state.totalItems}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;