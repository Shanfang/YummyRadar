import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
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
import { BusinessComponent } from './components/business/business.component';
import { ReviewBusinessComponent } from './components/review/review-business.component';
import {BusinessService} from './Services/business.service';
import {HttpClientModule} from '@angular/common/http';
import {ReviewBusinessListComponent} from './components/review/review-business-list.component';
import { BusinessDetailComponent } from './components/business/business-detail.component';
import { BusinessListComponent } from './components/business/business-list.component';
import { BusinessCardComponent } from './components/business/business-card/business-card.component';
import { ReviewEditComponent } from './components/review/review-edit.component';
import {ReadMoreDirective} from './read-more.directive';


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
  providers: [BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
