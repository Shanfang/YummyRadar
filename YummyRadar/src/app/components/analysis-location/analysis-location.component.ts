import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
import { GeoInfoService } from '../../Services/geo-info.service';
import { Location } from '../../Models/location.model';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis-location',
  templateUrl: './analysis-location.component.html',
  styleUrls: ['./analysis-location.component.scss'],
})
export class AnalysisLocationComponent implements OnInit {
  @ViewChild('f') locationForm: NgForm;

  private location: Location = {
    state: '',
    city: '',
    zipCode: ''
  };
  reviewCount: number = 0;
  stars: number = 0;
  chart = [];
  chartType = '';
  businessInfo: Object;
  constructor(
    private _analysisService: AnalysisService,
    private _geoInfoService: GeoInfoService
  ) {}

  stateOptions = ['IL', 'WI', 'SC'];
  cities: string[] = [];
  zipCodes: number[] = [];
  selectedState = 'IL';
  chartOptions = ['Line Graph', 'Bar Chart', 'Pie Chart'];
  charType = '';

  ngOnInit() {}

  onSelectState(stateName:  string) {
    this.selectedState = this.locationForm.controls['selectedState'].value;
    this.cities = this._geoInfoService.getCities(this.selectedState);
    // this.zipCodes = this._geoInfoService.getZipCodes(this.selectedState);
  }


  onSubmitSelection() {
    this.location.state = this.locationForm.value.selectedState;
    this.location.city = this.locationForm.value.selectedCity;
    // this.location.zipCode = this.locationForm.value.selectedZipCode;
    this.reviewCount = this.locationForm.value.selectedReviewCount;
    this.stars = this.locationForm.value.selectedStars;
    // this.chart = null;
    this.businessInfo = {
        "state": this.location.state,
        "city": this.location.city,
        "reviewCount": this.reviewCount,
        "stars": this.stars
    };
    this._analysisService.getBusinesses(this.businessInfo)
      .subscribe(
          (data: any) => {
            let categories = data.categories;
            let numbers = data.counts;
            var colors: string[] = new Array(categories.length);
            for (var i = 0; i < colors.length; i++) {
              colors[i] = this.getRandomColor();
            }
            if (categories.length > 0 && this.chartType == 'Pie Chart') {
              this.chart = new Chart('pie-chart-location', {
                type: 'pie',
                data: {
                  datasets: [
                    {
                      data: numbers,
                      borderColor: '#ffcc00',
                      backgroundColor: colors,
                      fill: true
                    }
                  ],
                  labels:categories
                },
                options: {
                  responsive: true,
                  title: {
                    display: true,
                    text: "Number of Different Restaurants for : " + this.location.city + " in " + this.location.state
                  }
                }
              })
            } else if (categories.length > 0 && this.chartType == 'Bar Chart') {
              this.chart = new Chart('bar-chart-location', {
                type: 'bar',
                data: {
                  datasets: [
                    {
                      data: numbers,
                      borderColor: '#ffcc00',
                      backgroundColor: colors,
                      fill: true
                    }
                  ],
                  labels:categories
                },
                options: {
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  title: {
                    display: true,
                    text: "Number of Different Restaurants for : " + this.location.city + " in " + this.location.state
                  }
                }
              })
            } else if (categories.length > 0 && this.chartType == 'Line Graph') {
              this.chart = new Chart('line-chart-location', {
                type: 'line',
                data: {
                  labels: categories,
                  datasets: [                   
                    {
                      data: numbers,
                      borderColor: '#ffcc00',
                      fill: false
                    }
                  ]
                },
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
                  },
                  title: {
                    display: true,
                    text: "Number of Different Restaurants for : " + this.location.city + " in " + this.location.state
                  }
                }
              })
            } else {
              alert("Oops, there is no matching data");
            }
            // this.locationForm.reset();
          },
          (error) => console.log(error)
      );
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
