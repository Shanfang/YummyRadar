import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../Services/analysis.service';
import { Response } from '@angular/http';
import { Location } from '../../modules/location.module';

@Component({
  selector: 'app-analysis-area',
  templateUrl: './analysis-area.component.html',
  styleUrls: ['./analysis-area.component.css']
})
export class AnalysisAreaComponent implements OnInit {
  // restaurants = [
  //   {
  //     id: this.generateID(),
  //     name: 'YummyCity',
  //     rating: 10
  //   },
  //   {
  //     id: this.generateID(),
  //     name: 'SmallHouse',
  //     rating: 5
  //   }
  // ];
  constructor(private analysisService: AnalysisService) {}
  ngOnInit() {
  }

  // onSelectLocation() {
  //   // this.analysisService.getRestaurants(location)
  //   // .subscribe(
  //   //   (response: Response) => {
  //   //     const data = response.json();
  //   //     console.log(data);
  //   //   },
  //   //   (error) => console.log(error)
  //   // )
  // }
  // onAddRestaurant(name: string) {
  //   this.restaurants.push({
  //     id: this.generateID(),
  //     name: name,
  //     rating: 6
  //   });
  // }

  // onSave() {
  //   this.analysisService.storeRestaurant(this.restaurants)
  //   .subscribe(
  //     (response: Response) => {
  //       const data = response.json();
  //       console.log(data);
  //     },
  //     (error) => console.log(error)
  //   );
  // }

  // private generateID() {
  //   return Math.round(Math.random() * 100);
  // }
}
