import React, { Component } from "react";
import { getProducts, getCustomers, setInvoice, putInvoice } from '../api/index';
import ProductItem from './product-item/index';
import ProductFooter from './product-footer/index';


export default class AddInvoice extends Component {
    constructor() {
        super();

        this.addProduct = this._addProduct.bind(this);
        this.changeDiscount = this._changeDiscount.bind(this);
        this.productCallBack = this._productCallBack.bind(this);

        this.state = {
            invoiceId: null,
            customers: [],
            products: [],
            selectedProducts: [],
            discount: 0,
            sum: 0,
            total: 0
        }
    }

    componentWillMount() {
        getCustomers().then((res) => {
            this.setState({
                customers: res.data
            })
        });

        getProducts().then((res) => {
            this.setState({
                products: res.data.map((item) => {
                    item.total = item.price;
                    return item
                })
            })
        })
    }

    _addProduct(event) {
        let id = Number(this.refs.selectedProduct.value);
        event.preventDefault();

        this.setState({
            products: this.state.products.filter((item) => item.id !== id),
            selectedProducts: [...this.state.selectedProducts,  ...this.state.products.filter((item) => item.id === id)]
        }, this._update);
    }

    _changeDiscount(event) {
        let discount = event.target.value;
        if (discount < 0) discount = 0;
        else if (discount > 100) discount = 100;

        this.setState({
            discount: discount
        }, this._update);
    }

    _productCallBack (id, quantity) {
        this.setState({
            selectedProducts: this.state.selectedProducts.map((item) => {
                if (item.id === id) item.total = quantity * item.price;
                return item
            })
        }, this._update)
    }

    _update() {
        let sum = this.state.selectedProducts.reduce((sum, item) => sum + parseFloat(item.total), 0);
        this.setState({
            sum: sum,
            total:  sum - (sum * this.state.discount / 100)
        }, this._updateInvoice);

    }

    _updateInvoice() {
        if (this.state.invoiceId) {
            this._changeInvoice();
        } else {
            this._saveInvoice();
        }
    }

    _saveInvoice() {
        setInvoice({
                customer_id: this.refs.customer.value,
                discount: this.state.discount,
                total: this.state.total
        }).then((res) => {
            this.setState({
                invoiceId: res.data.id
            })
        })
    }

    _changeInvoice() {
        putInvoice({
            customer_id: this.refs.customer.value,
            discount: this.state.discount,
            total: this.state.total
        }, this.state.invoiceId)
    }

    render() {
        const customerOptions = this.state.customers.map(item => <option value = {item.id} key={item.id}>{ item.name }</option>);
        const productOptions = this.state.products.map(item => <option value = {item.id} key={item.id}>{ item.name }</option>);
        const selectedProducts = this.state.selectedProducts.map((item) => <ProductItem
            key= {item.id}
            product={item}
            callback={ this.productCallBack }/> );

        return (
            <div className = "container">
                <div className="form-group row">
                    <label htmlFor="cust" className="col-sm-2 col-form-label">Select customer:</label>
                    <div className="col-sm-6">
                        <select ref="customer" className="form-control" id="cust">
                            { customerOptions }
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="prod" className="col-sm-2 col-form-label">Select product:</label>
                    <div className="col-sm-6">
                        <select ref="selectedProduct" className="form-control" id="prod">
                            { productOptions }
                        </select>
                    </div>
                    <button className="btn btn-primary col-sm-2" onClick={ this.addProduct }>Add product</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total price</th>
                        </tr>
                    </thead>
                    <tbody>
                        { selectedProducts }
                        <ProductFooter
                            total = { this.state.total }
                            sum = { this.state.sum }
                            discount = { this.state.discount }
                            changeDiscount = { this.changeDiscount }
                        />
                    </tbody>
                </table>
            </div>
        );
    }
}