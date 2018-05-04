import {Component, Input, OnInit} from '@angular/core';
import {Business} from '../../models/business.model';
import {Review} from '../../models/review.model';
import {BusinessService} from '../../Services/business.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.css']
})
export class ReviewEditComponent implements OnInit {

  myForm: FormGroup;

  @Input() business: Business;



  show=false;

  constructor(private businessService: BusinessService) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      text: new FormControl(null, Validators.required),
      stars: new FormControl(null, Validators.required),
    });
  }

  onCancelClick() {
    this.show = true;
  }

  onSubmit() {
    const review: Review = new Review();
    review.STARS = this.myForm.value.stars;
    review.TEXT = this.myForm.value.text;
    review.BUSINESS_ID = this.business.business_id;
    review.USER_ID = localStorage.getItem('id');
    review.USER_NAME = localStorage.getItem('name');
    review.RECENT_BUSINESS_NAME = this.business.name;
    console.log(review);

    this.businessService.saveReviews(review).subscribe(
      (data : Review) => {
        console.log(data);
      },
      (err:any) => {
        console.error(err);
    }
    )
  }
}
