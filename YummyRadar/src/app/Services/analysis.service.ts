import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Location } from '../modules/location.module';
// import 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class AnalysisService {
    constructor(private http: Http) {}
    apiURL: string = "http://127.0.0.1:3000";

    getBusinesses(location: Location) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.apiURL}/api/analysis/category/distribution`, location, {headers: headers});
        // return this.http.post(`${this.apiURL}/api/analysis/location`, location, {headers: headers});
    }
}