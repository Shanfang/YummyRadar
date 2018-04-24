import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Business} from '../../models/business.model';
import { BusinessService } from '../../Services/business.service';
import {Photo} from '../../models/photo.model';
import {Review} from '../../models/review.model';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit{
  business: Business = new Business();
  isEdited = false;
  showReviews: Review[] = [];

  reviewCount: number = 0;
  page: number = 1;
  pageOptions:number[] = [1];
  businessID: string;
  constructor(private businessService: BusinessService, private route: ActivatedRoute) {}

  photo_url: string;
  ngOnInit() {
    this.business.business_id = this.route.snapshot.params['id'];
    console.log(this.business.business_id);
    this.businessService.getBusiness(this.business.business_id).subscribe(
      (data: Business) => {
        Object.assign(this.business, data);
        console.log(this.business);
      },
      (error: any) => {
        console.error(error);
      }
    );
    this.business.photos = [];
    this.businessService.getPhotos(this.business.business_id).subscribe(
      (data: Photo[]) => {
        for (const recPhoto of data) {
          let photo: Photo = new Photo();
          Object.assign(photo, recPhoto);
          this.business.photos.push(photo);
        }
    },
      (error:any) => {
        console.error(error);
      }
    );
    this.business.reviews = [];
    this.businessService.getReviews(this.business.business_id).subscribe(
      (data: Review[]) => {
        this.reviewCount = data.length;
        for (const recReview of data) {
          let review: Review = new Review();
          Object.assign(review, recReview);
          this.business.reviews.push(review);
        }
        for (let i = 2; i <= (data.length/10); i++){
          this.pageOptions.push(i);
        }
        if (this.reviewCount < 10) {
          for (let i = 1; i < this.reviewCount; i++) {
            this.showReviews.push(this.business.reviews[i]);
          }
        } else {
          for (let i = (this.page * 10 - 9); i < (this.page * 10); i++) {
            this.showReviews.push(this.business.reviews[i]);
          }
        }      },
      (error:any) => {
        console.error(error);
       }
    );

    console.log(this.showReviews);
  }
  getPhotoUrl(photo: Photo) {
    return (photo == null)
      ? "http://35.196.58.1/yelp-business-photos/no-image-available.jpg"
      : "http://35.196.58.1/yelp-business-photos/" + photo.photo_id + ".jpg";
  }

  onRevieClick() {
    this.isEdited=!this.isEdited;
  }

  onNextPage() {
    this.showReviews = [];
    console.log(this.page);//==1
    if (this.reviewCount < 10) {
      for (let i = 1; i < this.reviewCount; i++) {
        this.showReviews.push(this.business.reviews[i]);
      }
    } else {
      for (let i = (this.page * 10 - 9); i < (this.page * 10); i++) {
        this.showReviews.push(this.business.reviews[i]);
      }
    }
  }
}
