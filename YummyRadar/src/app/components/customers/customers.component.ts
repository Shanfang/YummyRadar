import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {Customer} from "../../Models/customer";
import {Review} from "../../Models/review";
import {CustomerService} from "../../Services/customer.service";
import {AuthService} from "../../Services/auth.service";
import {Router} from '@angular/router';
import { NavBarComponent} from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @ViewChild('f') idForm: NgForm;


  constructor(private customerService: CustomerService, private authService: AuthService, private router: Router) { }
  myForm: FormGroup;

  customerOnline : Customer = {
    id : ''
  };


  review: Review = {
    USER_ID: '',
    TEXT: ''
  };

  reviews: Review[];
  showReviews: Review[];

  customer : Customer = {
    id :'',
    name : '',
    email: '',
    review_count: 0,
    cool: 0,
    useful: 0,
    funny: 0
  };
  // review1 = REVIEW;

  page: number = 1;
  dataLength: number = 0;
  pageOptions = [1];



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
    this.myForm.value.USER_ID = localStorage.getItem('id');
    this.review.USER_ID = this.myForm.value.USER_ID;
    this.reviews=[];
    this.customerService.getReview(this.review).subscribe(
      (data: Review[]) => {
        console.log(data);
        console.log(data.length);
        this.dataLength = data.length;

        //This is to control the page option numbers
        for (let i = 2; i <= ((data.length-1)/10+1); i++){
            this.pageOptions.push(i);
        }

        localStorage.setItem('text', data[1].TEXT);
        for (const item of data){
          let tempReview:Review = new Review();
          Object.assign(tempReview, item);
          this.reviews.push(tempReview);
        }

        // //console.log(localStorage.getItem('text'));
        // this.reviews[0].TEXT = data[0].TEXT;
        // this.reviews[1].TEXT = data[1].TEXT;
        // console.log(this.reviews[0].TEXT);
        console.log(this.reviews);

      },
      err => console.error(err)
    );


    // console.log(this.idForm);
    // this.getCustomer();
  }




  onSubmit() {
    console.log(111);
    console.log(this.myForm);


    this.reviews[0].TEXT="21214423432";

    this.myForm.reset();
  }

  onNextPage() {
    this.showReviews=[];
    console.log(this.page);//Initial is 1

    //This is control the length of showReviews
    if (this.dataLength < 10){
      for (let i = 0; i < this.dataLength; i++){
        this.showReviews.push(this.reviews[i]);
      }
    } else{
        if ((this.dataLength-(this.page*10)) > 0){
            for (let i = (this.page*10-9); i <= (this.page*10); i++){
              this.showReviews.push(this.reviews[i-1]);
            }
        } else {
          for (let i = (this.page*10-9); i <= (this.dataLength); i++){
            this.showReviews.push(this.reviews[i-1]);
          }
        }
    }
  }

  onLogout(){
      this.authService.logout();
      this.router.navigateByUrl('/');
  }
}
