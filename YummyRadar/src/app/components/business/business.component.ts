import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Business} from '../../models/business.model';
import { BusinessService } from '../../Services/business.service';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit{
  business: Business = new Business();
  @Input() businessID: string;
  constructor(private businessService: BusinessService) {}


  ngOnInit() {
    this.business.business_id = this.businessID;
    this.businessService.getBusiness(this.business.business_id).subscribe(
      (data: Business) => {
        Object.assign(this.business, data);
        console.log(this.business);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
