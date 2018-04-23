import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Location } from '../Models/location.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Injectable()
export class AnalysisService {
    constructor(private http: Http) {}
    apiURL: string = "http://127.0.0.1:3000";

    /*
    Get number of business for different food types in a selected location  
    */
    
    getBusinesses(businessInfo: Object) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.apiURL}/api/analysis/category/distribution`, businessInfo, {headers: headers})
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

    /*
    Get reviewCounts and stars data to calculate popularity for a specific restaurant
    */
    getTrend(id: string, year: string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(`${this.apiURL}/api/analysis/popularity/${id}/${year}`, {headers: headers})
            .map(
                (res: Response) => {
                    const data = res.json();
                    let months: string[] = [];
                    let popularity: number[] = [];


                    for (const t of data) {
                        months.push(t.MONTH);
                        popularity.push(t.MONTHLY_TOTAL);
                    }
                    // console.log(`The months are ${months}`);
                    // console.log(`The popularity are ${popularity}`);

                    return {months, popularity};
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw("Something is wrong");
                }
            );
    }

    /*
    Get top 10(other number can be easily cofigured) restaurants in a specified location
    */

    getTop10(businessInfo: Object) {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${this.apiURL}/api/analysis/popularity/top10`, businessInfo, {headers: headers})
            .map(
                (res: Response) => {
                    const data = res.json();
                    let names = [];
                    let numbers = [];
                    for (const d of data) {
                        names.push(d.NAME);
                        numbers.push(d.NUM);
                    }
                    return {names, numbers};
                }
            )
            .catch(
                (error: Response) => {
                    return Observable.throw("Something is wrong");
                }
            );
    }
}
