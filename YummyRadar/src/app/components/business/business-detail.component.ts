import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html'
})
export class BusinessDetailComponent implements OnInit {

  @Input() hours;

  constructor() {
  }

  ngOnInit() {

  }


  onShowClick() {
    console.log(this.hours.Monday);
  }
}
