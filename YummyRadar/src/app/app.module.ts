import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerService } from './services/customer.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HttpModule } from '@angular/http';

import {AuthComponent} from './components/auth/auth.component';
import {SigninComponent} from './components/auth/signin.component';
import {LogoutComponent} from './components/auth/logout.component';
import {SignupComponent} from './components/auth/signup.component';
import {AuthService} from './services/auth.service';
import {ErrorService} from './services/error.service';
// import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerProfileComponent,
    DashboardComponent,
    MessagesComponent,

    AuthComponent ,
    SigninComponent,
    LogoutComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [CustomerService, MessageService, AuthService, ErrorService],  
  bootstrap: [AppComponent]
})
export class AppModule { }
