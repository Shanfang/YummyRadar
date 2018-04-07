import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
import { Response } from '@angular/http';
import { Location } from '../../modules/location.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-analysis-location',
  templateUrl: './analysis-location.component.html',
  styleUrls: ['./analysis-location.component.scss']
})
export class AnalysisLocationComponent implements OnInit {
  @ViewChild('f') locationForm: NgForm;
  location: Location = {
    state: '',
    city: '',
    zipCode: ''
  };
  constructor(private analysisService: AnalysisService) {
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
    
    this.analysisService.getBusinesses(this.location)
    .subscribe(
      (response: Response) => {
        const data = response.json();
        console.log(data);
      },
      (error) => console.log(error)
    )
    this.locationForm.reset();
  }
}
