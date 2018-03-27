import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnalysisComponent } from './analysis/analysis.component';
// import { AppRoutingModule } from './app-routing.module';
// import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalysisComponent
  ],
  imports: [
    // AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
