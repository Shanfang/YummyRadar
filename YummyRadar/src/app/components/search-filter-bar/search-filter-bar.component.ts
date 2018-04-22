import { Component, OnInit, Inject,} from '@angular/core';


@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.css']
})
export class SearchFilterBarComponent implements OnInit {

  homeSearchInfo: Object;
  constructor(@Inject('data')  private dataservice) { }

  ngOnInit() {
  }

  /**
   * Show result after click the button "OpenNow";
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

}
