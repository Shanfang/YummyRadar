import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';
import { SearchingComponent } from './components/searching/searching.component';
import { routing } from './app.router';
import { DataService } from './Services/data.service';


//zun
import {CustomersComponent} from "./components/customers/customers.component";
import {CustomerProfileComponent} from "./components/customer-profile/customer-profile.component";
import {AuthComponent} from "./components/auth/auth.component";
import {SigninComponent} from "./components/auth/signin.component";
import {SignupComponent} from "./components/auth/signup.component";
import {LogoutComponent} from "./components/auth/logout.component";


import {AuthService} from "./Services/auth.service";
import {CustomerService} from "./Services/customer.service";
import {ErrorService} from "./Services/error.service";
import {ReadMoreDirective} from "./read-more.directive";
import {ReviewComponent} from "./components/review/review.component";
import {ReviewListComponent} from "./components/review/review-list.component";




import {MatToolbarModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatTooltipModule,
  MatDialogModule,
  MatCheckboxModule
  } from '@angular/material';
import { BusinessComponent } from './components/business/business.component';
import { ReviewBusinessComponent } from './components/review/review-business.component';
import { BusinessService} from './Services/business.service';
import { ReviewBusinessListComponent} from './components/review/review-business-list.component';
import { BusinessDetailComponent } from './components/business/business-detail.component';
import { BusinessListComponent } from './components/business/business-list.component';
import { BusinessCardComponent } from './components/business/business-card/business-card.component';
import { ReviewEditComponent } from './components/review/review-edit.component';

import { AnalysisService } from './Services/analysis.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AnalysisLocationComponent } from './components/analysis-location/analysis-location.component';
import { GeoInfoService } from './Services/geo-info.service';
import { AnalysisBusinessComponent } from './components/analysis-business/analysis-business.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchFilterBarComponent } from './components/search-filter-bar/search-filter-bar.component';
import {SummaryService} from './Services/summary.service';
import {SummaryComponent} from './components/summary/summary.component';


@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    ReviewBusinessComponent,
    ReviewBusinessListComponent,
    BusinessDetailComponent,
    BusinessListComponent,
    BusinessCardComponent,
    ReviewEditComponent,
    ReadMoreDirective,
    SearchingComponent,
    NavBarComponent,
    AnalysisTypeComponent,
    AppComponent,
    SearchingComponent,
    NavBarComponent,
    SearchResultComponent,
    SearchFilterBarComponent,
    AnalysisLocationComponent,
    AnalysisBusinessComponent,

    //Zun
    CustomersComponent,
    CustomerProfileComponent,
    AuthComponent ,
    SigninComponent,
    LogoutComponent,
    SignupComponent,
    ReadMoreDirective,
    ReviewListComponent,
    ReviewComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,

  ],
  providers: [
    AnalysisService,
    { provide: 'data', useClass: DataService },
    AuthService, GeoInfoService, CustomerService, ErrorService, BusinessService, SummaryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
