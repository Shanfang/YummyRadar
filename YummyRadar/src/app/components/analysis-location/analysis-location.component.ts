import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
// import { Response } from '@angular/http';
import { Location } from '../../modules/location.module';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis-location',
  templateUrl: './analysis-location.component.html',
  styleUrls: ['./analysis-location.component.scss']
})
export class AnalysisLocationComponent implements OnInit {
  @ViewChild('f') locationForm: NgForm;

   chart = [];
  location: Location = {
    state: '',
    city: '',
    zipCode: ''
  };
  constructor(private _analysisService: AnalysisService) {
   }

  ngOnInit() {
    this.location.state = "";
    this.location.city = "";
    this.location.zipCode = "";
  }
  onSelectLocation() {
    console.log(this.locationForm);
    this.location.state = this.locationForm.value.state;
    this.location.city = this.locationForm.value.city;
    this.location.zipCode = this.locationForm.value.zipCode;
    
    this._analysisService.getBusinesses(this.location)
    .subscribe(
      // (response: Response) => { 
        // const data = response.json();
      response => {
        let ID = response['ID'].map(response => response.ID);
        let star = response['star_count'].map(response => response.star_count);
        let review = response['review_count'].map(response => response.review_count);
        // console.log(data);
        var myBarChart = new Chart('canvas', {
          type: 'horizontalBar',
          data: ID,
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
      })},
      (error) => console.log(error)
    )
    this.locationForm.reset();
  }
}
