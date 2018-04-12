import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Customer } from './models/customer';
import { CUSTOMER } from './mock-customers';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService {

  getCustomer(): Observable<Customer[]> {
    //Todo: fetch real customer data from oracle database
    this.messageService.add('Customer service: fetched customer data');
    return of (CUSTOMER);//Asynchronous fetch data from data, now is from mock-customer
    // return this.http.get<Customer[]>(this.customer_feched_url);

    // return this.http.get<Customer[]>(this.customer_feched_url).pipe(
    //   tap(customer1 => this.log(`fetched customer`)),
    //   catchError(this.handleError('getCustomer', []))
    // );
  }

  /** PUT: update the customer on the server */
updateCustomer (customer: Customer): Observable<any> {
  return this.http.put(this.customer_feched_url, customer, httpOptions).pipe(
    tap(_ => this.log(`updated customer id=${customer.id}`)),
    catchError(this.handleError<any>('updateCustomer'))
  );
}

  private customer_feched_url = 'api/customer';  // URL to web api


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** Log a CustomerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CustomerService: ' + message);
  }
}
