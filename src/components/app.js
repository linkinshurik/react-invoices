import React, { Component } from 'react';
import Invoices from './invoises/index';
import AddInvoice from './invoice-edit/index';

export default class App extends Component {
  constructor() {
    super();
    this.changeActiveInvoice = this._changeActiveInvoice.bind(this);
    this.state = {
      activeAddInvoice: false
    }
  }

  _changeActiveInvoice() {
    this.setState({
        activeAddInvoice: !this.state.activeAddInvoice
    })
  }

  render() {
    const addButton = this.state.activeAddInvoice ?
          <button type="button" onClick = {this.changeActiveInvoice} className="btn btn-secondary">Hide invoice</button>
        : <button type="button" onClick = {this.changeActiveInvoice} className="btn btn-primary">Add invoice</button>;
    const invoiceForm = this.state.activeAddInvoice ?
          <AddInvoice/>
        : null;

      return (
        <div>
          <Invoices/>
          { addButton }
          { invoiceForm }
        </div>
    );
  }
}
