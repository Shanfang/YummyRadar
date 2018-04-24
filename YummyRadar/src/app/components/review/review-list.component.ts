import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../Models/review';

@Component({
  selector: 'app-review-list',
  template: `
  <app-review *ngFor="let review of this.reviews; let i = index" [index]="i" [review]="review"></app-review>
  `
})
export class ReviewListComponent implements OnInit {

  @Input() reviews: Review[];

  constructor() { }

  ngOnInit() {

  }

}
