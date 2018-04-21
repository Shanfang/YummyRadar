import { Component, OnInit } from '@angular/core';
import {Business} from '../../models/business.model';
import {BusinessService} from '../../Services/business.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html'
})
export class BusinessListComponent implements OnInit {

  businessIDArray: string[] = [
    '-CxNhGa-yskzfrTP9GX6zA',
    '-D9NFU_SZpp5J7VCSsPp1Q',
    '-E99ntlcOByVayPyA9Ak8A',
    '-05uZNVbb8DhFweTEOoDVg'];

  businesses: Business[] = [];

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    this.businessService.getBusinesses(this.businessIDArray).subscribe(
      (data: Business[]) => {
        for (const recBusiness of data) {
          const business: Business = new Business();
          Object.assign(business, recBusiness);
          this.businesses.push(business);
        }
        console.log(this.businesses);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
