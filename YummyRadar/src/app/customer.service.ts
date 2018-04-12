import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CustomerID } from './models/customerID';

@Injectable()
export class CustomerService {
    constructor(private http: Http) {}
    apiURL: string = "http://127.0.0.1:3000";
    getCustomer(customerID: CustomerID) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.apiURL}/api/customers/`, customerID, {headers: headers});
    }
}
