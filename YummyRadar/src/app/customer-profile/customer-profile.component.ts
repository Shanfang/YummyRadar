import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerService } from '../customer.service';




@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
  @Input() customer: Customer;
  
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  // save(): void {
  //   this.customerService.updateCustomer(this.customer)
  //     .subscribe(() => this.goBack());
  // }

}
