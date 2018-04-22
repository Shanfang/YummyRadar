import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class AuthService {

  constructor(private  http: HttpClient) {}

  // signup(customer: Customer) {
  //   const body = JSON.stringify(customer);
  //   const headers = new HttpHeaders({'Content-type':'Application/json'});
  //   return this.http.post('http://localhost:3000/customer', body, {headers: headers})
  //     .catch((err: HttpErrorResponse) => {
  //       return Observable.throw(err.error);
  //     });
  // }

  // signin(customer: Customer) {
  //   const body = JSON.stringify(customer);
  //   const headers = new HttpHeaders({'Content-type':'Application/json'});
  //   return this.http.post('http://localhost:3000/customer/signin', body, {headers: headers})
  //     .catch((err: HttpErrorResponse) => {
  //       return Observable.throw(err.error);
  //     });
  // }

  // logout() {
  //   localStorage.clear();
  // }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
}
