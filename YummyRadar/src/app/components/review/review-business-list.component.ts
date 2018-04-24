import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../models/review.model';

@Component({
  selector: 'app-review-business-list',
  template: `
    <app-review-business *ngFor="let review of this.reviews; let i = index" [index]="i"
                         [review]="review"></app-review-business>
  `
})
export class ReviewBusinessListComponent implements OnInit {

  @Input() reviews: Review[];

  constructor() { }

  ngOnInit() {
  }

}
