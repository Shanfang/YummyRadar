import {EventEmitter, Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataService {
  constructor(private http: Http) { }
  localhost: string = "http://127.0.0.1:3000";
  apiURL: string = "http://127.0.0.1:3000";
  //private backEndHostUrl: String = "http://127.0.0.1:1323/api/v1";

  /**
   * Handle Error cases
   */
  private handleError(err){
    let errMessage: string;
    if (err instanceof Response){
        let body = err.json() || '';
        let error = body.error || JSON.stringify(body);
        errMessage = `${err.status} - ${err.statusText || ''} ${error}`;

    } else {
        errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }

  getHeader(): RequestOptions {
    let access_token: string = localStorage.getItem("access_token");
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + access_token);
    return new RequestOptions({ headers: headers });
  }


  /**
   * Searching by inputting restaurant name and places.
   * @param restName
   * @param place
   */
  getRestNameFromRestandAddr(searchInfo): Observable<string>{
    if (searchInfo){
      let headers :  Headers = new Headers({'Content-Type': 'application/json'});
      let options : RequestOptions = new RequestOptions({headers:headers});
      return this.http.post(`${this.apiURL}/api/Searching/basic`, searchInfo ,options)
        .map(res => {
          return res.json();
        })
        .do(res => {
            if(res.token) {
            }
        })
        .catch(this.handleError);
    }
  }

   /**
   * Searching with option "Open Now"
   * Diane Xie
   */
  getRestNameFromRestNameAddrOpenNow(searchInfo): Observable<string>{
    if (searchInfo){
      let headers :  Headers = new Headers({'Content-Type': 'application/json'});
      let options : RequestOptions = new RequestOptions({headers:headers});
      return this.http.post(`${this.apiURL}/api/searching/openNow`, searchInfo ,options)
        .map(res => res.json())
        .do(res => {

        })
        .catch(this.handleError);
    }
  }

  /**
   * Searching with option "Distance in 5 miles"
   * Diane Xie
   */
  getRestNameFromRestNameAddrDist5Miles(searchInfo): Observable<string>{
    if (searchInfo){
      let headers :  Headers = new Headers({'Content-Type': 'application/json'});
      let options : RequestOptions = new RequestOptions({headers:headers});
      searchInfo = {"restName": searchInfo.restName,
                    "place": searchInfo.restPost,
                    "latituemax": 43.138763,
                    "latituemin": 43.0,
                    "longitudemax":-89.3,
                    "longitudemin":-89.5
                   };
      console.log(searchInfo)
      return this.http.post(`${this.apiURL}/api/searching/dist5miles`, searchInfo ,options)
        .map(res => res.json())
        .do(res => {

        })
        .catch(this.handleError);
    }
  }

  /**
   * Searching with option "Order Delivery"
   * Diane Xie
   */
  getRestNameFromRestNameAddrAndorderDelivery(searchInfo): Observable<string>{
    if (searchInfo){
      let headers :  Headers = new Headers({'Content-Type': 'application/json'});
      let options : RequestOptions = new RequestOptions({headers:headers});
      console.log(searchInfo);
      return this.http.post(`${this.apiURL}/api/searching/orderdelivery`, searchInfo ,options)
        .map(res => res.json())
        .do(res => {

        })
        .catch(this.handleError);
    }
  }

  searchCategoryOptions(searchInfo): Observable<string>{
    if (searchInfo){
      let headers :  Headers = new Headers({'Content-Type': 'application/json'});
      let options : RequestOptions = new RequestOptions({headers:headers});
      console.log(searchInfo);
      return this.http.post(`${this.apiURL}/api/searching/category`, searchInfo ,options)
        .map(res => res.json())
        .do(res => {

        })
        .catch(this.handleError);
    }
  }

}
