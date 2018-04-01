import { Component, OnInit } from '@angular/core';
import {Customer} from '../customer';
import { Review } from '../review';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  review: Review = {
    id: '001',
    text: 'sadklfja;lsdkjl'
  }


  customer: Customer = {
    id: 'tom1',
    password: 'abc',
    name: 'Tom',
    email: 'tom@gmail.com',
    review_num: 3,
    cool_num: 1,
    funny_num: 0,
    useful_num: 0
  };

  constructor() { }

  ngOnInit() {
  }

}
