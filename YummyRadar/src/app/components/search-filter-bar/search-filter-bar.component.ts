import { Component, OnInit, Inject,} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.css']
})
export class SearchFilterBarComponent implements OnInit {

  myForm: FormGroup;
  homeSearchInfo: Object;
  constructor(@Inject('data')  private dataservice) { }

  /*Checkbox variables */
  selectMexcanFood: boolean;
  selectAmericanFood: boolean;
  selectChineseFood: boolean;
  selectSeaFood: boolean;

  ngOnInit() {
  }

  /**
   * Searching after clicking the button "OpenNow";
   * Diane Xie
   */
  filterOpenNow(): void{
    this.homeSearchInfo = JSON.parse(localStorage.getItem('searchInfo'));
    console.log(this.homeSearchInfo);
    this.dataservice.getRestNameFromRestNameAddrOpenNow(this.homeSearchInfo)
      .subscribe(
        searchList => {
        console.log("-----------");
        console.log(searchList);
        localStorage.setItem('searchList', searchList);
      },

        // err => {
        //   console.log("cannot find the result");
        // } 
      );
  }

  /**
   * Searching with option "Distance in 5 miles"
   * Diane Xie
   */
  filterDist5miles(): void{
    this.homeSearchInfo = JSON.parse(localStorage.getItem('searchInfo'));
    console.log(this.homeSearchInfo);
    this.dataservice.getRestNameFromRestNameAddrDist5Miles(this.homeSearchInfo)
      .subscribe(
        searchList => {
        console.log("-----------");
        console.log(searchList);
        localStorage.setItem('searchList', searchList);
      },

    );
  }
  
  /**
   * Searching with option "Order Delivery"
   * Diane Xie
   */
  orderDelivery(): void{
    this.homeSearchInfo = JSON.parse(localStorage.getItem('searchInfo'));
    console.log(this.homeSearchInfo);
    this.dataservice.getRestNameFromRestNameAddrAndorderDelivery(this.homeSearchInfo)
      .subscribe(
        searchList => {
        console.log("-----------");
        console.log(searchList);
        localStorage.setItem('searchList', searchList);
      },

    );
  }

  /**
   * Handle checkbox options
   */
  changeSelectMexicanFood(){
    this.selectMexcanFood = !this.selectMexcanFood;
    console.log("selectMexcanFood: "+this.selectMexcanFood);
  }
  changeSelectAmericanFood(){
    this.selectAmericanFood = !this.selectAmericanFood;
    console.log("selectAmericanFood: "+this.selectAmericanFood);
  }
  changeSelectChineseFood(){
    this.selectChineseFood = !this.selectChineseFood;
    console.log("selectChineseFood: "+this.selectChineseFood);
  }
  changeSelectSeaFood(){
    this.selectSeaFood = !this.selectSeaFood;
    console.log("selectSeaFood: "+this.selectSeaFood);
  }

  /**
   * Checkbox submittion
   */
  categorySearch():void{
    this.homeSearchInfo = JSON.parse(localStorage.getItem('searchInfo'));
    console.log("homeSearchInfo:");
    console.log(this.homeSearchInfo);
    let categoryOptions: Object;
    categoryOptions = {
      "place": this.homeSearchInfo['restPost'],
      "selectMexcanFood":this.selectMexcanFood,
      "selectAmericanFood":this.selectAmericanFood,
      "selectChineseFood":this.selectChineseFood,
      "selectSeaFood":this.selectSeaFood,
    }
    console.log(categoryOptions);
    this.dataservice.searchCategoryOptions(categoryOptions)
      .subscribe(
        searchList => {
        console.log("-----------");
        console.log(searchList);
        localStorage.setItem('searchList', searchList);
      },
    );
  }

}
