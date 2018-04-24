import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Business} from '../../models/business.model';
import { BusinessService } from '../../Services/business.service';
import {Photo} from '../../models/photo.model';
import {Review} from '../../models/review.model';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit{
  business: Business = new Business();
  isEdited = false;
  @Input() businessID: string;
  constructor(private businessService: BusinessService) {}

  photo_url: string;
  ngOnInit() {
    this.business.business_id = this.businessID;
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
        for (const recReview of data) {
          let review: Review = new Review();
          Object.assign(review, recReview);
          this.business.reviews.push(review);
        }
        console.log(this.business);
      },
      (error:any) => {
        console.error(error);
      }
    )
  }
  getPhotoUrl(photo: Photo) {
    return (photo == null)
      ? "http://35.196.58.1/yelp-business-photos/no-image-available.jpg"
      : "http://35.196.58.1/yelp-business-photos/" + photo.photo_id + ".jpg";
  }

  onRevieClick() {
    this.isEdited=!this.isEdited;
  }
}
