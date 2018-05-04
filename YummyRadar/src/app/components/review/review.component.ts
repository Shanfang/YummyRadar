import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Review} from '../../models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit{

  @Input() review: Review;
  @Input() index: number;

  content: string = "123";
  tag: string;

  constructor() {}

  ngOnInit() {
    this.tag = "text" + this.index;
    console.log(this.review);
    //console.log(this.tag);
  }

}
