import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';

import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  myForm: FormGroup;
  customer: Customer = {
    id: 'abc',
    name: ''
  }
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    
    this.customer.id = localStorage.getItem('id');
    this.customer.name = localStorage.getItem('name');
    console.log(localStorage.getItem('id'));
    console.log(localStorage.getItem('name'));

    this.myForm = new FormGroup({
      id: new FormControl(
        null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
      name: new FormControl(
        null,
        Validators.required
      )
    });
  }
  onSubmit() {
    console.log(this.myForm);
    this.customer.id = this.myForm.value.id;
    this.customer.name = this.myForm.value.name;
    this.customerService.updateProfile(this.customer).subscribe(
      data => {
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user_id', data.user_id);
        console.log(data);
      },
      err => console.error(err)
    );
    this.myForm.reset();
  }

}
