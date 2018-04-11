import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerService } from './customer.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerProfileComponent,
    DashboardComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [CustomerService, MessageService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
