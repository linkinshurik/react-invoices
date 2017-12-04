import axios from 'axios';

const SERVER_URL = 'http://localhost:8000/'

export function getInvoices() {
    return axios.get( SERVER_URL + 'api/invoices');
}

export function setInvoice(invoice) {
    return axios.post( SERVER_URL + 'api/invoices', invoice);
}

export function putInvoice(invoice, id) {
    return axios.put( SERVER_URL + 'api/invoices/' + id, invoice);
}

export function deleteInvoice(id) {
    return axios.delete( SERVER_URL + 'api/invoices/' + id);
}

export function getProducts() {
    return axios.get( SERVER_URL + 'api/products');
}

export function getCustomers() {
    return axios.get( SERVER_URL + 'api/customers');
}

export function getInvoiseItem(id) {
    return axios.get( SERVER_URL + `/api/invoices/${id}/items`);
}