import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Business} from '../models/business.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import * as _ from "lodash";

@Injectable()
export class BusinessService {

  constructor(private http: HttpClient) {
  }

  private businesses: Business[] = [];
  apiURL: string = 'http://localhost:3000/v1/business/';

  getBusiness(businessID: string) {
    return this.http.get(this.apiURL + businessID)
      .map((response: Response) => {
        var business = response['obj'][0];
        business = _.mapKeys(business, function (v, k) { return k.toLowerCase(); });
        return business;
      })
      .catch((error: Response) => Observable.throw(error));
  }
  getBusinesses(businessIDArray: string[]) {
    console.log(businessIDArray.toString());
    return this.http.get(this.apiURL + 'array/' + businessIDArray)
      .map((response: Response) => {
        console.log(response['obj']);
        var businesses = []
        var data = response['obj'];
        for (let business of data){
          business = _.mapKeys(business, function (v, k) { return k.toLowerCase(); });
          businesses.push(business);
        }
        console.log(businesses);
        return businesses;
        // business = _.mapKeys(business, function (v, k) { return k.toLowerCase(); });
      })
      .catch((error: Response) => Observable.throw(error));
  }
}
