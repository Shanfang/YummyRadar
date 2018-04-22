import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis-business',
  templateUrl: './analysis-business.component.html',
  styleUrls: ['./analysis-business.component.scss']
})
export class AnalysisBusinessComponent implements OnInit {

  @ViewChild('f') businessInfoForm: NgForm;
  chart = [];
  chartType = '';
  businessID = '';
  selectedYear = '';

  constructor(
    private _analysisService: AnalysisService,
  ) {}

  years = ['2010', '2011', '2012', '2013','2014', '2015'];
  charts = ['Line Graph', 'Pie Chart'];
  ngOnInit() {}

  onSubmitInfo() {
    this._analysisService.getTrend(this.businessID, this.selectedYear)
      .subscribe(
          (data: any) => {
            let months: string[] = data.months;
            let popularity: number[] = data.popularity;
            // console.log(`The months are ${months}`);
            // console.log(`The popularity are ${popularity}`);

            if (this.chartType == 'Line Graph') {
              var colors: string[] = new Array(months.length);
              for (var i = 0; i < colors.length; i++) {
                colors[i] = this.getRandomColor();
              }
              this.chart = new Chart('line-chart-business', {
                type: 'line',
                data: {
                  labels: months,
                  datasets: [                   
                    {
                      data: popularity,
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
                    text: "Popularity Changes for : " + this.businessID + " in " + this.selectedYear
                  }
                }
              })
            } else if (this.chartType == 'Pie Chart') {
              var colors: string[] = new Array(12);
              for (var i = 0; i < 12; i++) {
                colors[i] = this.getRandomColor();
              }
              this.chart = new Chart('pie-chart-business', {
                type: 'pie',
                data: {
                  datasets: [
                    {
                      data: popularity,
                      borderColor: '#ffcc00',
                      backgroundColor: colors,
                      fill: true
                    }
                  ],
                  labels:months
                },
                options: {
                  responsive: true,
                  title: {
                    display: true,
                    text: "Popularity Changes for : " + this.businessID + " in " + this.selectedYear;
                  }
                }
              })
            } else {
              alert("Oops, there is no matching data");
            }
            this.businessInfoForm.reset();
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
