import { Component, OnInit, Inject,} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

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

