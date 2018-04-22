import { Injectable } from '@angular/core';
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
        .map(res => res.json())
        .do(res => {
            if(res.token) {     
            }
        })
        .catch(this.handleError);
    } 
  }

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

}
