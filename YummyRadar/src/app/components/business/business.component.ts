import { Component, OnInit } from '@angular/core';
import { Business} from '../../models/business.model';
import { BusinessService } from '../../Services/business.service';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  business: Business = new Business();
  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getBusiness().subscribe(
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
