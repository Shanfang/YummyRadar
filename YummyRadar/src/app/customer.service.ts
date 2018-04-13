import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Customer } from './models/customer';

@Injectable()
export class CustomerService {
    constructor(private http: Http) {}
    apiURL: string = "http://127.0.0.1:3000";
    getCustomer(customer: Customer) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.apiURL}/api/customers/`, customer, {headers: headers});
    }
}
