import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Review} from '../../models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styles: [`
        .less {
          color: blue;
        }
        .more {
          color: blue;
        }
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 60%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 10%;
        }
    `]
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
    console.log(this.tag);
  }

}
