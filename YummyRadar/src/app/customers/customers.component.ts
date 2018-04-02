import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
// import { CUSTOMER } from '../mock-customers';
import { Review } from '../review';
import { REVIEW } from '../mock-reviews';
import { CustomerService } from '../customer.service';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
}) 
export class CustomersComponent implements OnInit {
  review1 = REVIEW;

  review: Review = {
    id: '001',
    text: 'sadklfja;lsdkjl'
  }


  //the customer list, actually only one customer, can be clicked
  // customer1 = CUSTOMER; //This is from mock-customers
  customer1 : Customer[];//This is from customer service

  selectedCustomer: Customer;

  constructor(private customerService: CustomerService) { }
  
  onSelect (customer: Customer): void {
    this.selectedCustomer = customer;
  }

  getCustomer(): void {
    // this.customer1 = this.customerService.getCustomer();
    this.customerService.getCustomer().subscribe(customer1 => this.customer1 = customer1);
  }

  // customer: Customer = {
  //   id: 'tom1',
  //   password: 'abc',
  //   name: 'Tom',
  //   email: 'tom@gmail.com',
  //   review_num: 3,
  //   cool_num: 1,
  //   funny_num: 0,
  //   useful_num: 0
  // };

  ngOnInit() {
    this.getCustomer();
  }
}
