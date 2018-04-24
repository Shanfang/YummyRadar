import {Component, Input, OnInit} from '@angular/core';
import {Business} from '../../../models/business.model';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() business: Business;

  photo_url: string;

  constructor() { }

  ngOnInit() {
    this.photo_url = (this.business.recent_photo == null)
      ? "http://35.196.58.1/yelp-business-photos/no-image-available.jpg"
      : "http://35.196.58.1/yelp-business-photos/" + this.business.recent_photo + ".jpg";
  }

  onReadMore() {

  }
}
