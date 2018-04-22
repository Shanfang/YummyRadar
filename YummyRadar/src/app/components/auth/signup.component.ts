import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { Customer } from '../../models/customer';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
  myForm: FormGroup;
  

  constructor(private authService: AuthService) {}

  customer : Customer = {
    id : '',
    password : '',
    name : ''
  }

  onSubmit() {
      this.customer.id = this.myForm.value.id,
      this.customer.password = this.myForm.value.password,
      this.customer.name = this.myForm.value.name,
    
    this.authService.signup(this.customer).subscribe(
      data => console.log(data),
      err => console.error(err)
    );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      id: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
      ]),
      password: new FormControl(null, Validators.required)
    });
  }
}


