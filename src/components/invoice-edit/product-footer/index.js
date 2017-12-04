import React from 'react';

const ProductFooter = (props) => {
    const { total, sum, discount, changeDiscount } = props;

    return (
        <tr>
            <td>Discount %:</td>
            <td><input type="number" id="discount" value={discount} onChange = { changeDiscount } /></td>
            <td>Total: $ { sum.toFixed(2) }</td>
            <td>With discount: $ { total.toFixed(2) }</td>
        </tr>
    )
};

export default ProductFooter;