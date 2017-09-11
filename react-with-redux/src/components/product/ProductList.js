import React, { Component, PropTypes } from 'react';
import ProductListRow from './ProductListRow';
import { PAGE_INDEX, PAGE_SIZE } from '../../commons/common';

const ProductList = ({ products }) => {
    return (
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
                        {products.map((product, key) =>
                            {/* <ProductListRow key={product.ProductID} index={key} product={product} /> */}
                        )}
                    </tbody>
                </table>
                {/* <Pagination
                    activePage={this.state.pageIndex}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={this.state.totalItems}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                /> */}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired
};


export default ProductList;
