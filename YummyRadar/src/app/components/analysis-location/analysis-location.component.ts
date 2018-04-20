import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
// import { Response } from '@angular/http';
import { Location } from '../../modules/location.module';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis-location',
  templateUrl: './analysis-location.component.html',
  styleUrls: ['./analysis-location.component.scss'],
})
export class AnalysisLocationComponent implements OnInit {
  @ViewChild('f') locationForm: NgForm;

  location: Location = {
    state: '',
    city: '',
    zipCode: '',
    reviewCount: 0,
    stars: 0,
  };
  chart = [];
  categories = [];
  numbers = [];

  constructor(private analysisService: AnalysisService) {
   }

  ngOnInit() {
    this.location.state = "";
    this.location.city = "";
    this.location.zipCode = "";
    this.location.reviewCount = 0;
    this.location.stars = 0;
  }
  onSelectLocation() {
    console.log(this.locationForm);
    this.location.state = this.locationForm.value.state;
    this.location.city = this.locationForm.value.city;
    this.location.zipCode = this.locationForm.value.zipCode;
    this.location.reviewCount = this.locationForm.value.reviewCount;
    this.location.stars = this.locationForm.value.stars;

    this.analysisService.getBusinesses(this.location)
      .subscribe(
          (data: any) => {
            console.log(`Category is: ${data.categories[0]}`);
            console.log(`Count: is ${data.counts[0]}`);
            console.log(data);
          },
          (error) => console.log(error)
        );
    this.locationForm.reset();
  }
}
