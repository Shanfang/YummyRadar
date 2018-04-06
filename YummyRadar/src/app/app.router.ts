
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SearchingComponent } from './components/searching/searching.component';
import { AnalysisAreaComponent } from './components/analysis-area/analysis-area.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';

const appRoutes: Routes = [
    {path: 'analysis/area', component: AnalysisAreaComponent},
    {path: 'analysis/type', component: AnalysisTypeComponent},
    {path: 'home', component: SearchingComponent},
];

export const routing = RouterModule.forRoot(appRoutes);

