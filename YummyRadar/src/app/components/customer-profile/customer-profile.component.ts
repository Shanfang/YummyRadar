import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import {Customer} from "../../Models/customer";
import {CustomerService} from "../../Services/customer.service";
import {Router} from '@angular/router';
import {AuthService} from "../../Services/auth.service";


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  myForm: FormGroup;
  myForm1: FormGroup;

  customer: Customer = {
    id: '',
    name: '',
    email: ''
  }

  customer1: Customer = {
    id: '',
    name: '',
    email: ''
  }

  constructor(private customerService: CustomerService, private authService: AuthService, private router: Router) { }

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
      ),
      email: new FormControl(
        null,
        Validators.required
      )
    });

    this.myForm1 = new FormGroup({

      id: new FormControl(
        null,
        Validators.required
      )
    });

  }
  onSubmit() {
    console.log('on submit here my form');
    this.myForm.value.id = localStorage.getItem('id');

    this.customer.id = this.myForm.value.id;
    this.customer.name = this.myForm.value.name;
    this.customer.email = this.myForm.value.email;

    localStorage.setItem('name', this.myForm.value.name);
    localStorage.setItem('email', this.myForm.value.email);
    this.router.navigateByUrl('/customers');
    this.customerService.updateProfile(this.customer).subscribe(
      data => {
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user_id', data.user_id);
        console.log('hahahahhahaha');

      },
      err => console.error(err)
    );
    this.myForm.reset();
  }

  onDestroy(){
    this.customer1.id = localStorage.getItem('id');

    this.authService.destroy(this.customer1).subscribe(
      data => {
        console.log('im destroying');
      },
      err => console.error(err)
    );

    this.router.navigateByUrl('/');
    localStorage.clear();
  }

}
