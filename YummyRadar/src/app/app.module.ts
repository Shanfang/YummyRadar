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
import { AnalysisService } from './Services/analysis.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AnalysisLocationComponent } from './components/analysis-location/analysis-location.component';
import {AuthService} from './Services/auth.service';
import { GeoInfoService } from './Services/geo-info.service';
import { AnalysisBusinessComponent } from './components/analysis-business/analysis-business.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchFilterBarComponent } from './components/search-filter-bar/search-filter-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchingComponent,
    NavBarComponent,
    AnalysisTypeComponent,
    AppComponent,
    SearchingComponent,
    NavBarComponent,
    SearchResultComponent,
    SearchFilterBarComponent,
    AnalysisLocationComponent,
    AnalysisBusinessComponent
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
    AuthService, GeoInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
