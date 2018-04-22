import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../models/customer';
import { CUSTOMER } from '../mock-customers';
import { Review } from '../models/review';
// import { REVIEW } from '../mock-reviews';
import { CustomerService } from '../services/customer.service';
import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
}) 
export class CustomersComponent implements OnInit {
  //the customer list, actually only one customer, can be clicked
  // customer1 = CUSTOMER; //This is from mock-customers
  // customer1: Customer[];//This is from customer service
  // selectedCustomer: Customer;
  
  @ViewChild('f') idForm: NgForm;
  // id : CustomerID = {
  //   id: ''
  // };

  customerOnline : Customer = {
    id : ''
  };
  
  customer : Customer = {
    id :'',
    name : '',
    review_count: 0,
    cool: 0,
    useful: 0,
    funny: 0
  }
  // review1 = REVIEW;
  

  constructor(private customerService: CustomerService) { }
  
  ngOnInit() {
    this.customerOnline.id = "";
    this.customer.id = localStorage.getItem('id');
    this.customer.name = localStorage.getItem('name');
    this.customer.review_count = parseInt(localStorage.getItem('review_count'));
    this.customer.cool = parseInt(localStorage.getItem('cool'));
    this.customer.useful = parseInt(localStorage.getItem('useful'));
    this.customer.funny = parseInt(localStorage.getItem('funny'));

    // console.log(this.idForm);
    // this.getCustomer();
  }

  onSelectCustomer() {
    console.log(this.idForm);
    this.customerOnline.id = this.idForm.value.id;
   

    this.customerService.getCustomer(this.customerOnline)
    .subscribe(
      (response: Response) => {
        const data = response.json();
        console.log(data);
      },
      (error) => console.log(error)
    )
    this.idForm.reset();
  }
}
