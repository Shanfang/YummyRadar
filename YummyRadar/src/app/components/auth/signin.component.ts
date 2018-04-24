import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import { Customer } from '../../Models/customer';
import {Router} from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  myForm: FormGroup;

  customer : Customer = {
    id : '',
    password : ''
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      id: new FormControl(
        null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
      password: new FormControl(
        null,
        Validators.required
      )
    });
  }

  onSubmit() {
    console.log(this.myForm);
    this.customer.id = this.myForm.value.id;
    this.customer.password = this.myForm.value.password;

    this.authService.signin(this.customer).subscribe(
      data => {
        // localStorage.setItem('token', data.token);
        // localStorage.setItem('user_id', data.user_id);
        console.log(data);
        console.log(data.USER_ID);
        console.log(data.REVIEW_COUNT);
        this.customer.id = data.USER_ID;


        localStorage.setItem('id', data.USER_ID);
        localStorage.setItem('name', data.NAME);
        localStorage.setItem('email', data.EMAIL);
        localStorage.setItem('review_count', data.REVIEW_COUNT.toString());
        localStorage.setItem('cool', data.COOL.toString());
        localStorage.setItem('funny', data.FUNNY.toString());
        localStorage.setItem('useful', data.USEFUL.toString());


        this.router.navigateByUrl('/home');
      },
      err => console.error(err)
    );
    this.myForm.reset();
  }

}
