import { Component, OnInit, Inject,} from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  form: FormGroup;
  searchRestList: Object;

  constructor(@Inject('data')  private dataservice,
    private _route:Router) { 
    this.form = new FormGroup({
      restName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+$'),
      ])),

      restPost: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(200),
      ])),
    });
  }

  ngOnInit() {
  }

  /**
   * Handle homepage searching function
   */
  searchSubmit(searchInfo){
    localStorage.setItem('searchInfo', JSON.stringify(searchInfo));
    this.dataservice.getRestNameFromRestandAddr(searchInfo)
      .subscribe(
        searchList => {
        console.log("-----------");
        console.log(searchList);
        localStorage.setItem('searchList', searchList);

        this.searchRestList = searchList;
        this._route.navigate(['/searchResult']);
      },

        // err => {
        //   console.log("cannot find the result");
        // } 
      );
  }


}
