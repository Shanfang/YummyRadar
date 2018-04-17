import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Business} from '../models/business.model'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BusinessService {

  constructor(private http: HttpClient) {
  }

  private businesses: Business[] = [];

  getBusiness() {
    return this.http.get('http://localhost:3000/v1/business')
      .map(response => response['obj'])
      .catch((error: Response) => Observable.throw(error));
  }
}
