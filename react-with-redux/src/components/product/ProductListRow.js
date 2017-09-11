import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { PAGE_INDEX, PAGE_SIZE } from '../../commons/common';

const ProductListRow = ({ product, index }) => {
    return (
        <tr key={product.ProductID}>
            <td className="text-center">{PAGE_SIZE * (PAGE_INDEX - 1) + index + 1}</td>
            <td>{product.ProductName}</td>
            <td>{product.QuantityPerUnit}</td>
            <td>{product.UnitPrice} $</td>
            <td className="text-center">
                <Link to={`/product/${product.ProductID}`} className="btn green btn-outline btn-sm">
                    <i className="glyphicon glyphicon-edit"></i>
                </Link>
                <a href="javascript:void(0)" className="btn green btn-outline btn-sm">
                    <i className="glyphicon glyphicon-trash"></i>
                </a>
            </td>
        </tr>
    );
}

export default ProductListRow