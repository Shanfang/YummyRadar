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

  businessID = '';
  selectedYear = '';
  constructor(
    private _analysisService: AnalysisService,
  ) {}

  years = ['2010', '2011', '2012', '2013','2014', '2015'];

  ngOnInit() {}

  onSubmitInfo() {
    this._analysisService.getTrend(this.businessID, this.selectedYear)
      .subscribe(
          (data: any) => {
            let months: string[] = data.months;
            let popularity: number[] = data.popularity;
            // console.log(`The months are ${months}`);
            // console.log(`The popularity are ${popularity}`);

            if (months.length > 0) {
              var colors: string[] = new Array(months.length);
              for (var i = 0; i < colors.length; i++) {
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
                    text: "Popularity of Different Month for : " + this.businessID + " in " + this.selectedYear;
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
