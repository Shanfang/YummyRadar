
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {BusinessComponent} from './components/business/business.component';
import {BusinessListComponent} from './components/business/business-list.component';


import { SearchingComponent } from './components/searching/searching.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';
import { AnalysisLocationComponent } from './components/analysis-location/analysis-location.component';
import { AnalysisBusinessComponent } from './components/analysis-business/analysis-business.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

//Zun
import {CustomersComponent} from "./components/customers/customers.component";
import {CustomerProfileComponent} from "./components/customer-profile/customer-profile.component";
import {AuthComponent} from "./components/auth/auth.component";
import {AUTH_ROUTES} from "./components/auth/auth.routes";

const appRoutes: Routes = [
    
    {path: 'analysis/location', component: AnalysisLocationComponent},
    {path: 'analysis/business', component: AnalysisBusinessComponent},
    {path: 'analysis/type', component: AnalysisTypeComponent},
    {path: 'searchResult', component: SearchResultComponent},
    {path: 'home', component: SearchingComponent},
    {path: 'business-list', component: BusinessListComponent},
    { path: 'business/:id', component: BusinessComponent},
    //Zun
    { path: 'customers', component: CustomersComponent },
    { path: 'profiles', component: CustomerProfileComponent },
    { path: 'auth', component: AuthComponent , children: AUTH_ROUTES },
    { path: '', component: SearchingComponent},
];

export const routing = RouterModule.forRoot(appRoutes);

