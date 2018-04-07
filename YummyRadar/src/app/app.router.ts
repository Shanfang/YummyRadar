
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SearchingComponent } from './components/searching/searching.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';
import { AnalysisLocationComponent } from './components/analysis-location/analysis-location.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/analysis/location', pathMatch: 'full'},
    {path: 'analysis/location', component: AnalysisLocationComponent},
    {path: 'analysis/type', component: AnalysisTypeComponent}
];

export const routing = RouterModule.forRoot(appRoutes);

