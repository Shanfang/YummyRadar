import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {
  localhost = "http://127.0.0.1:3000";
  //private backEndHostUrl: String = "http://127.0.0.1:1323/api/v1";

  getHeader(): RequestOptions {
    let access_token: string = localStorage.getItem("access_token");
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + access_token);
    return new RequestOptions({ headers: headers });
  }

  constructor(private http: Http) { }

  //  Searching by inputting restaurant name and places.
  getRestNameFromRestandAddr(restName:string, place:string){
    if (restName && place){
      console.log("Searching bases on a resturant name and place");
    } else if (restName){
      console.log("Searching only bases on a resturant name ");
    } else if (place){
      console.log("Searching only bases on a place");
    } else {
      console.log("Searching with any info");
    }
  }

  getRestNameFromRestBindAddr(restName:string, place:string){
    
  }

}
