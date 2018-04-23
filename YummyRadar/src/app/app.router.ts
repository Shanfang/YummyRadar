
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SearchingComponent } from './components/searching/searching.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';
import { AnalysisLocationComponent } from './components/analysis-location/analysis-location.component';
import { AnalysisBusinessComponent } from './components/analysis-business/analysis-business.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'analysis/business', pathMatch: 'full'},
    {path: 'analysis/location', component: AnalysisLocationComponent},
    {path: 'analysis/business', component: AnalysisBusinessComponent},
    {path: 'analysis/type', component: AnalysisTypeComponent},
    {path: 'searchResult', component: SearchResultComponent},
    {path: 'home', component: SearchingComponent},
];

export const routing = RouterModule.forRoot(appRoutes);

