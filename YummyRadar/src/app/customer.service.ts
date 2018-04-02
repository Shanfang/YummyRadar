import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './customer';
import { CUSTOMER } from './mock-customers';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomerService {

  getCustomer(): Observable<Customer[]> {
    //Todo: fetch real customer data from oracle database
    this.messageService.add('Customer service: fetched customer data');
    // return of(CUSTOMER);//Asynchronous fetch data from data, now is from mock-customer
    return this.http.get<Customer[]>(this.customer_feched_url)
  }

  private customer_feched_url = 'api/customer';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CustomerService: ' + message);
  }


}
