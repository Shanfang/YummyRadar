import { Component, OnInit, ViewChild } from '@angular/core';
import { SummaryService } from '../../Services/summary.service';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {
  @ViewChild('f') summaryForm: NgForm;

  constructor(
    private _summaryService: SummaryService
  ) {}
  ngOnInit() {}

  businessCount: number = 0;
  businessAttributeCount: number = 0;
  businessCatCount: number = 0;
  businessCheckinCount: number = 0;
  businessHourCount: number = 0;
  tipCount: number = 0;
  photoCount: number = 0;
  reviewCount: number = 0;
  userCount: number = 0;
  
  
   getTotalRows() {
      this._summaryService.getTotalRows()
      .subscribe(
        (data: any) => {
          console.log("Total number of rows "+ data[0].TOTAL);
          this.businessCount = data[0].TOTAL;
        });
    }
    getBusinessCount() {
      this._summaryService.getBusinessCount()
      .subscribe(
        (data: any) => {
          console.log("data for Business_count "+ data[0].BUSINESS_COUNT);
          this.businessCount = data[0].BUSINESS_COUNT
        });
    }

    getBusinessAttributeCount() {
        this._summaryService.getBusinessAttributeCount()
          .subscribe(
            (data: any) => {
            console.log(data);
            console.log("data for BusinessAttr_count "+ data[0].BUSINESSATTR_COUNT);
            this.businessAttributeCount = data[0].BUSINESSATTR_COUNT
          });  
    }

    getBusinessCatCount() {
      this._summaryService.getBusinessCategoryCount()
        .subscribe(
          (data: any) => {
          console.log(data);
          console.log("data for BusinessCat_count "+ data[0].BUSINESSCAT_COUNT);
          this.businessCatCount = data[0].BUSINESSCAT_COUNT
        });  
  }
  getBusinessCheckinCount() {
    this._summaryService.getBusinessCheckinCount()
      .subscribe(
        (data: any) => {
        console.log(data);
        this.businessCheckinCount = data[0].BUSINESS_CHECKIN_COUNT;
        console.log("data for BusinessCheckin_count "+ data[0].BUSINESS_CHECKIN_COUNT);
      });  
  }

  getBusinessHoursCount() {
    this._summaryService.getBusinessHoursCount()
      .subscribe(
        (data: any) => {
        console.log(data);
        this.businessHourCount = data[0].BUSINESS_HOURS_COUNT;
        // console.log(`Get business attribute ${data}`);
        console.log("data for hours count "+ data[0].BUSINESS_HOURS_COUNT);
      });  
  }

  getTipCount() {
    this._summaryService.getTipCount()
    .subscribe(
      (data: any) => {
      console.log(data);
      this.tipCount = data[0].TIP_COUNT;
      // console.log(`Get business attribute ${data}`);
      console.log("data for tip count "+ data[0].TIP_COUNT);
    });
}

  getPhotoCount() {
    this._summaryService.getPhotoCount()
    .subscribe(
      (data: any) => {
      console.log(data);
      this.photoCount = data[0].PHOTO_COUNT;
      // console.log(`Get business attribute ${data}`);
      console.log("data for photo "+ data[0].PHOTO_COUNT);
    });
  }

  getReviewCount() {
    this._summaryService.getReviewCount()
    .subscribe(
      (data: any) => {
      console.log(data);
      this.reviewCount = data[0].REVIEW_COUNT;
      // console.log(`Get business attribute ${data}`);
      console.log("data for review count "+ data[0].REVIEW_COUNT);
    });
  }

  getUserCount() {
    this._summaryService.getUserCount()
    .subscribe(
      (data: any) => {
      console.log(data);
      this.userCount = data[0].USER_COUNT;
      // console.log(`Get business attribute ${data}`);
      console.log("data for user count "+ data[0].USER_COUNT);
    });
  }

  getTotalCount() {
    let total: number = 0;
    total = this.businessCount 
            + this.businessAttributeCount
            + this.businessCatCount 
            + this.businessCheckinCount
            + this.businessHourCount
            + this.tipCount
            + this.photoCount
            + this.reviewCount
            + this.userCount;
  }
}
