
import { RouterModule, Routes, CanActivate } from '@angular/router';
import {BusinessComponent} from './components/business/business.component';
import {BusinessListComponent} from './components/business/business-list.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/business-list', pathMatch: 'full'},
    {path: 'business-list', component: BusinessListComponent},
    {path: 'business/:id', component: BusinessComponent}
];

export const routing = RouterModule.forRoot(appRoutes);

