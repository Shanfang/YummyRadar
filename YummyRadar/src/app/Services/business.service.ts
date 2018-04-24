import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Business} from '../models/business.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import * as _ from "lodash";
import {Review} from '../models/review.model';

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
    return this.http.get(this.apiURL + 'array/' + businessIDArray)
      .map((response: Response) => {
        var businesses = []
        var data = response['obj'];
        for (let business of data){
          business = _.mapKeys(business, function (v, k) { return k.toLowerCase(); });
          businesses.push(business);
        }
        return businesses;
        // business = _.mapKeys(business, function (v, k) { return k.toLowerCase(); });
      })
      .catch((error: Response) => Observable.throw(error));
  }
  getPhotos(businessID: string) {
    return this.http.get(this.apiURL + 'photos/'+ businessID)
      .map((response: Response) => {
        console.log(response);
        var photos = []
        var data = response['obj'];
        for (let photo of data){
          photo = _.mapKeys(photo, function (v, k) { return k.toLowerCase(); });
          photos.push(photo);
        }
        return photos;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  getReviews(businessID: string) {
    return this.http.get(this.apiURL + 'reviews/'+ businessID)
      .map((response: Response) => {
        console.log(response);
        var reviews = []
        var data = response['obj'];
        for (let review of data){
          // review = _.mapKeys(review, function (v, k) { return k.toLowerCase(); });
          reviews.push(review);
        }
        return reviews;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  saveReviews(review: Review) {

    const body = JSON.stringify(review);
    const headers = new HttpHeaders({'Content-type':'Application/json'});
    return this.http.post(this.apiURL + 'saveReviews/', body, {headers: headers})
      .catch((err: HttpErrorResponse) => {
        return Observable.throw(err.error);
      });
  }

}
