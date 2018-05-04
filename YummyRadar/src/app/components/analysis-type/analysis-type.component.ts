import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
import { GeoInfoService } from '../../Services/geo-info.service';
import { Location } from '../../Models/location.model';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis-type',
  templateUrl: './analysis-type.component.html',
  styleUrls: ['./analysis-type.component.css'],
})
export class AnalysisTypeComponent implements OnInit {

  @ViewChild('f') locationForm: NgForm;

  location: Location = {
    state: '',
    city: '',
    zipCode: ''
  };
  reviewCount = 0;
  stars = 0;
  businessTpye: string = '';
  chart = [];
  chartType = '';
  cities: string[] = [];
  selectedState = 'IL';

  constructor(
    private _analysisService: AnalysisService,

    private _geoInfoService: GeoInfoService
  ) {}

  stateOptions = ['IL', 'WI', 'SC'];
  chartOptions = ['Line Graph', 'Bar Chart', 'Pie Chart'];
  businessTypes = ['American (Traditional)', 'American (New)', 'Italian', 'Chinese', 'Mexican','Bars', 'Pizza', 'Burgers', 'Sandwiches'];

  ngOnInit() {}
  businessInfo: Object;

  onSelectState(stateName:  string) {
    this.selectedState = this.locationForm.controls['selectedState'].value;
    this.cities = this._geoInfoService.getCities(this.selectedState);
  }


  onSubmitSelection() {

    this.location.state = this.locationForm.value.selectedState;
    this.location.city = this.locationForm.value.selectedCity;
    this.businessTpye = this.locationForm.value.selectedBusinessType;
    this.businessInfo = {
      "state": this.locationForm.value.selectedState,
      "city": this.locationForm.value.selectedCity,
      "businessType": this.locationForm.value.selectedBusinessType
    };

    this._analysisService.getTop10(this.businessInfo)
      .subscribe(
          (data: any) => {
            let names = data.names;
            let numbers = data.numbers;
            var colors: string[] = new Array(names.length);
            for (var i = 0; i < colors.length; i++) {
              colors[i] = this.getRandomColor();
            }
            if (names.length > 0 && this.chartType == 'Pie Chart') {

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
                  labels:names
                },
                options: {
                  responsive: true,
                  title: {
                    display: true,
                    text: 'Top 10 most popular business of type ' + this.businessTpye + ' in ' + this.location.state + ' : ' +  this.location.city
                  }
                }
              })
            } else if (names.length > 0 && this.chartType == 'Bar Chart') {
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
                  labels:names
                },
                options: {
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  title: {
                    display: true,
                    text: 'Top 10 most popular business of type ' + this.businessTpye + ' in ' + this.location.state + ' : ' +  this.location.city
                  }
                }
              })
            } else if (names.length > 0 && this.chartType == 'Line Graph') {
              this.chart = new Chart('line-chart-location', {
                type: 'line',
                data: {
                  labels: names,
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
                    text: 'Top 10 most popular business of type ' + this.businessTpye + ' in ' + this.location.state + ' : ' +  this.location.city
                  }
                }
              })
            } else {
              alert("Oops, there is no matching data");
            }
            this.locationForm.reset();
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
