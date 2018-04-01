import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMER } from './mock-customers';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable()
export class CustomerService {

  getCustomer(): Observable<Customer[]> {
    this.messageService.add('Customer service: fetched customer data');
    return of (CUSTOMER);//Asynchronous fetch data from data, now is from mock-customer
  }


  constructor(private messageService: MessageService) { }

}
