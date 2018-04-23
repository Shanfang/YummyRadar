import {Injectable} from '@angular/core';
import { Customer } from '../models/customer';
import { Review } from '../models/review';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ErrorService} from './error.service';
@Injectable()

@Injectable()
export class CustomerService {
    constructor(private  http: HttpClient, private errorService: ErrorService) {}


    getCustomer(customer: Customer) {
        const body = JSON.stringify(customer);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(`http://localhost:3000/api/customer/`, body, {headers: headers});
    }


    getReview(review: Review) {
        const body = JSON.stringify(review);
        const headers = new HttpHeaders({'Content-type':'Application/json'});
        return this.http.post('http://localhost:3000/api/customer/review', body, {headers: headers})
        .map((response: Response) => {
          return response;
        })
          .catch((err: HttpErrorResponse) => {
            this.errorService.handleError(err.error);
            return Observable.throw(err.error);
          });
    }

    updateProfile(customer: Customer) {
        const body = JSON.stringify(customer);
        const headers = new HttpHeaders({'Content-type':'Application/json'});
        return this.http.post('http://localhost:3000/api/customer/updateProfile', body, {headers: headers})
          .catch((err: HttpErrorResponse) => {
            this.errorService.handleError(err.error);
            return Observable.throw(err.error);
          });
    }

    nextPage(){
      const headers = new HttpHeaders({'Content-type':'Application/json'});
      return this.http.get('http://localhost:3000/api/customer/review', {headers: headers})
        .catch((err: HttpErrorResponse) => {
          this.errorService.handleError(err.error);
          return Observable.throw(err.error);
        });
    }
}
