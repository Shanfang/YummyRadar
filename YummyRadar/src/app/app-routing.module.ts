import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component'

import {AuthComponent} from './components/auth/auth.component';
import {AUTH_ROUTES} from './components/auth/auth.routes';



const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profiles', component: CustomerProfileComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  
  { path: 'auth', component: AuthComponent , children: AUTH_ROUTES }




];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
