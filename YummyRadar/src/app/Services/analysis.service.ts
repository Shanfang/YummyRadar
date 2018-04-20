import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Location } from '../modules/location.module';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AnalysisService {
    constructor(private http: Http) {}
    apiURL: string = "http://127.0.0.1:3000";

    getBusinesses(location: Location) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.apiURL}/api/analysis/category/distribution`, location, {headers: headers})
            .map(
                (res: Response) => {
                    const data = res.json();
                    let categories = [];
                    let counts = [];
                    for (const loc of data) {
                        categories.push(loc.CATEGORY);
                        counts.push(loc.NUM);
                    }
                    return {categories, counts};
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw("Something is wrong");
                }
            );
    }
}