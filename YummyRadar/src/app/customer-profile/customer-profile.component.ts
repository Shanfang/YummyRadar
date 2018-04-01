import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer';




@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  @Input() customer: Customer;
  
  constructor() { }

  ngOnInit() {
  }

}
