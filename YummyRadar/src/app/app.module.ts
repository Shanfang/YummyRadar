import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AnalysisAreaComponent } from './components/analysis-area/analysis-area.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';
import { SearchingComponent } from './components/searching/searching.component';
import { routing } from './app.router';

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
  MatDialogModule
  } from '@angular/material';
import { AnalysisService } from './Services/analysis.service';
import { BusinessComponent } from './components/business/business.component';
import { ReviewComponent } from './components/review/review.component';
import {BusinessService} from './Services/business.service';
import {HttpClientModule} from '@angular/common/http';
import {ReviewListComponent} from './components/review/review-list.component';
import { BusinessDetailComponent } from './components/business/business-detail.component';
import { BusinessListComponent } from './components/business/business-list.component';
import { BusinessCardComponent } from './components/business/business-card/business-card.component';
import { ReviewEditComponent } from './components/business/review-edit/review-edit.component';
import {ReadMoreDirective} from './read-more.directive';


@NgModule({
  declarations: [
    AppComponent,
    AnalysisAreaComponent,
    AnalysisTypeComponent,
    AppComponent,
    SearchingComponent,
    BusinessComponent,
    ReviewComponent,
    ReviewListComponent,
    BusinessDetailComponent,
    BusinessListComponent,
    BusinessCardComponent,
    ReviewEditComponent,
    ReadMoreDirective
  ],
  imports: [
    BrowserModule,
    routing,
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
    HttpClientModule,
  ],
  providers: [AnalysisService, BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
