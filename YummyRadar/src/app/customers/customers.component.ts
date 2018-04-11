import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { CUSTOMER } from '../mock-customers';
import { Review } from '../review';
import { REVIEW } from '../mock-reviews';
import { CustomerService } from '../customer.service';
import { Response } from '@angular/http';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
}) 
export class CustomersComponent implements OnInit {
  review1 = REVIEW;



  //the customer list, actually only one customer, can be clicked
  // customer1 = CUSTOMER; //This is from mock-customers
  customer1: Customer[];//This is from customer service

  selectedCustomer: Customer;

  constructor(private customerService: CustomerService) { }
  
  onSelect (customer: Customer): void {
    this.selectedCustomer = customer;
  }

  getCustomer(): void {
    // this.customer1 = this.customerService.getCustomer();
    this.customerService.getCustomer('tom1').subscribe(
      (response: Response) => {
        const data = response.json();
        console.log(data);
      },
      (error) => console.log(error)
    )
  }

  ngOnInit() {
    this.getCustomer();
  }
}
