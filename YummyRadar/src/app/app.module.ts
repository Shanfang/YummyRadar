import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisAreaComponent } from './analysis/analysis-area/analysis-area.component';
import { AnalysisTypeComponent } from './analysis/analysis-type/analysis-type.component';
// import { AppRoutingModule } from './app-routing.module';
// import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent,
    AnalysisAreaComponent,
    AnalysisTypeComponent
  ],
  imports: [
    // AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
