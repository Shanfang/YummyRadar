
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AnalysisAreaComponent } from './components/analysis-area/analysis-area.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';
import {BusinessComponent} from './components/business/business.component';
import {BusinessListComponent} from './components/business/business-list.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/business-list', pathMatch: 'full'},
    {path: 'business-list', component: BusinessListComponent},
    {path: 'analysis/type', component: AnalysisTypeComponent},
    {path: 'business/:id', component: BusinessComponent}
];

export const routing = RouterModule.forRoot(appRoutes);

