import React, { Component } from 'react';
import moment from 'moment';
import { getInvoices } from '../api/index';

export default class Invoices extends Component {

    constructor() {
        super();
        this.state = {
            invoices: []
        }
    }

    componentWillMount() {
        getInvoices().then((res) => {
            this.setState({
                invoices: res.data
            })
        });
    }


    render() {
        const invoicesList = this.state.invoices.map((invoice)=> {
            return (
                <tr key = { invoice.id }>
                    <td>{ moment(invoice.createdAt).format('MMMM D h:mm:ss a') }</td>
                    <td>{ invoice.id }</td>
                    <td>{ invoice.discount }</td>
                    <td>{ invoice.total.toFixed(2) }</td>
                </tr>
            )
        });

        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Invoice ID</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    { invoicesList }
                </tbody>
            </table>
        )
    }
}