import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit,OnChanges } from '@angular/core';
import { Customer } from '../models/customer';
import { CUSTOMER } from '../mock-customers';
import { Review } from '../models/review';
// import { REVIEW } from '../mock-reviews';
import { CustomerService } from '../services/customer.service';
import { Response } from '@angular/http';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-customers',
  template: `
        <div [innerHTML]="currentText">
        </div>
            <a [class.hidden]="hideToggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
    `,
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
}) 
export class CustomersComponent implements OnInit, OnChanges {
  @ViewChild('f') idForm: NgForm;
  @Input() text: string;
  @Input() maxLength: number = 100;
  currentText: string;
  hideToggle: boolean = true;

  public isCollapsed: boolean = true;
  toggleView() {
      this.isCollapsed = !this.isCollapsed;
      this.determineView();
  }
  determineView() {
      if (this.text.length <= this.maxLength) {
          this.currentText = this.text;
          this.isCollapsed = false;
          this.hideToggle = true;
          return;
      }
      this.hideToggle = false;
      if (this.isCollapsed == true) {
          this.currentText = this.text.substring(0, this.maxLength) + "...";
      } else if(this.isCollapsed == false)  {
          this.currentText = this.text;
      }

  }
  ngOnChanges() {
      this.determineView();       
  }
  
  constructor(private customerService: CustomerService, private elementRef: ElementRef) { }
  myForm: FormGroup;

  customerOnline : Customer = {
    id : ''
  };


  review: Review = {
    USER_ID: '',
    TEXT: ''
  }

  reviews: Review[] = [
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''},
    {TEXT: ''}
  ]
  
  customer : Customer = {
    id :'',
    name : '',
    email: '',
    review_count: 0,
    cool: 0,
    useful: 0,
    funny: 0
  }
  // review1 = REVIEW;
  

  
  ngOnInit(): void {
    this.customerOnline.id = "";
    this.customer.id = localStorage.getItem('id');
    this.customer.name = localStorage.getItem('name');
    this.customer.email = localStorage.getItem('email');
    this.customer.review_count = parseInt(localStorage.getItem('review_count'));
    this.customer.cool = parseInt(localStorage.getItem('cool'));
    this.customer.useful = parseInt(localStorage.getItem('useful'));
    this.customer.funny = parseInt(localStorage.getItem('funny'));

    this.myForm = new FormGroup({
      USER_ID: new FormControl(
        null, [
      ])
    });


    // console.log(this.idForm);
    // this.getCustomer();
  }

  onSubmit() {
    console.log(111);
    console.log(this.myForm);
    
    this.myForm.value.USER_ID = localStorage.getItem('id');
    this.review.USER_ID = this.myForm.value.USER_ID;
    
    this.customerService.getReview(this.review).subscribe(
      data => {
        console.log(data);
        console.log(data.length);
        localStorage.setItem('text', data[1].TEXT);
        console.log(localStorage.getItem('text'));
        this.reviews[0].TEXT = data[0].TEXT;
        this.reviews[1].TEXT = data[1].TEXT;

        
      },
      err => console.error(err)
    );
    this.myForm.reset();
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
