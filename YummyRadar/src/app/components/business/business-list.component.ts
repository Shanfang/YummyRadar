import { Component, OnInit } from '@angular/core';
import {Business} from '../../models/business.model';
import {BusinessService} from '../../Services/business.service';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html'
})
export class BusinessListComponent implements OnInit {

  raw_data: string[][] = [ [ '-mst4KdHEmeF3Qm0Xfouhw' ],
    [ '1Hhc1h5TETqtVMgasiimuQ' ],
    [ 'bqNV9FU60H9BVPJ4kWptOA' ],
    [ 'bvFq5igEVGc9UAP3IVfYFA' ],
    [ 'aYoeWXcFXu2BsWuYIMd6Ow' ],
    [ 'EtE2sqkrwoYAU-8mef0UOg' ],
    [ 'cRDEkJWuXpKzuSYUpmyX5w' ],
    [ 'DhMshA4a0t5wlOq7u0RiMw' ],
    [ 'hAvbgXux4yn4_9IBtwzhXQ' ],
    [ 'GJuLpVI1MjMA25-evMjCVA' ],
  ];

  businessIDArray: string[] = [
    '-CxNhGa-yskzfrTP9GX6zA',
    '-D9NFU_SZpp5J7VCSsPp1Q',
    '-E99ntlcOByVayPyA9Ak8A',
    '-05uZNVbb8DhFweTEOoDVg'];

  businesses: Business[] = [];
  showBusinesses: Business[] = [];
  page:number = 1;
  businessCount: number = 0;
  pageOptions: number[]=[1];
  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.raw_data.length; i++){
      this.businessIDArray.push(this.raw_data[i][0]);
    }
    this.businessService.getBusinesses(this.businessIDArray).subscribe(
      (data: Business[]) => {
        this.showBusinesses = [];
        this.businessCount = data.length;
        for (const recBusiness of data) {
          let business: Business = new Business();
          Object.assign(business, recBusiness);
          this.businesses.push(business);
        }
        for (let i = 2; i <= ((data.length-1)/10) + 1; i++){
          this.pageOptions.push(i);
        }
        if (this.businessCount < 10) {
          for (let i = 1; i < this.businessCount; i++) {
            this.showBusinesses.push(this.businesses[i]);
          }
        } else {
          for (let i = (this.page * 10 - 9); i < (this.page * 10); i++) {
            this.showBusinesses.push(this.businesses[i]);
          }
        }
        console.log(this.businesses);
        console.log(this.showBusinesses);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onNextPage() {
    this.showBusinesses = [];
    if (this.businessCount < 10) {
      for (let i = 1; i < this.businessCount; i++) {
        this.showBusinesses.push(this.businesses[i]);
      }
    } else {
      for (let i = (this.page * 10 - 9); i < (this.page * 10); i++) {
        this.showBusinesses.push(this.businesses[i]);
      }
    }
  }
}

