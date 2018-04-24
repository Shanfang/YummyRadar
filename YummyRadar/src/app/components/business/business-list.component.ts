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

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    for (let i = 0; i < this.raw_data.length; i++){
      this.businessIDArray.push(this.raw_data[i][0]);
    }
    this.businessService.getBusinesses(this.businessIDArray).subscribe(
      (data: Business[]) => {
        for (const recBusiness of data) {
          let business: Business = new Business();
          Object.assign(business, recBusiness);
          this.businesses.push(business);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}

