import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
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

  constructor(private _analysisService: AnalysisService) {
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

    this._analysisService.getBusinesses(this.location)
      .subscribe(
          (data: any) => {
            let categories = data.categories;
            let numbers = data.counts;
            this.chart = new Chart('pie-chart-canvas', {
              type: 'pie',
              data: {
                datasets: [
                  {
                    data: numbers,
                    borderColor: '#ffcc00',
                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
                    fill: true
                  }
                ],
                labels:categories
              },
              options: {
                responsive: true,
                title: {
                  display: true,
                  text: "Number of Differet Restaurants"
                }
              }
            })

          },
          (error) => console.log(error)
        );
    this.locationForm.reset();
  }
}
