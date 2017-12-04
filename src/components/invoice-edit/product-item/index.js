import React, { Component } from 'react';

export default class ProductItem extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1
        };

        this.changeQuantity = this._changeQuantity.bind(this);
    }

    _changeQuantity(event) {
        const { callback, product } = this.props;
        if (event.target.value < 0) return;
        this.setState({
            quantity: event.target.value
        }, callback(product.id, event.target.value))
    }

    render() {
        const { product } = this.props;
        const { quantity } = this.state;

        return (
            <tr>
                <td>{ product.name }</td>
                <td>
                    <input type="number"
                           value = { quantity }
                           id="quantity"
                           onChange = {this.changeQuantity}
                    />
                </td>
                <td>$ { product.price.toFixed(2) }</td>
                <td>$ { product.total.toFixed(2) }</td>
            </tr>
        )
    }
}