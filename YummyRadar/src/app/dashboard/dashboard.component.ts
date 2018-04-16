import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
// import {AuthService} from '.././services/auth.service';
import { CustomerService } from '.././services/customer.service';

import {Customer} from '../models/customer';
import { Review } from '../models/review';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myForm: FormGroup;

  review: Review = {
    USER_ID: ''
  }


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      USER_ID: new FormControl(
        null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ])
    });
  }
  onSubmit() {
    console.log(this.myForm);
    this.review.USER_ID = this.myForm.value.USER_ID;
    this.customerService.getReview(this.review).subscribe(
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
