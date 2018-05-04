import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Location } from '../Models/location.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class SummaryService {
  constructor(private http: Http) {}
  apiURL: string = "http://127.0.0.1:3000";
  
  /*
  Get summary of dataset for all tables.
  */
  getTotalRows() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/total`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );

  }

  getBusinessCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/business`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
  }

  getBusinessAttributeCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/businessAttr`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
  }

  getBusinessCategoryCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/businessCat`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
  }

  getBusinessCheckinCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/businessCheckIn`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
    }

  getBusinessHoursCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/businessHours`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
    }

  getTipCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/tip`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
    }

  getPhotoCount() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(`${this.apiURL}/api/analysis/summary/photo`, {headers: headers})
        .map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw("Something is wrong");
            }
        );
  }

  getReviewCount() {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get(`${this.apiURL}/api/analysis/summary/review`, {headers: headers})
          .map(
              (res: Response) => {
                  const data = res.json();
                  return data;
              }
          )
          .catch(
              (error: Response) => {
                  return Observable.throw("Something is wrong");
              }
          );
    }

    getUserCount() {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.get(`${this.apiURL}/api/analysis/summary/users`, {headers: headers})
          .map(
              (res: Response) => {
                  const data = res.json();
                  return data;
              }
          )
          .catch(
              (error: Response) => {
                  return Observable.throw("Something is wrong");
              }
          );
    }
}
