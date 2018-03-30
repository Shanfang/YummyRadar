import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisAreaComponent } from './analysis/analysis-area/analysis-area.component';
import { AnalysisTypeComponent } from './analysis/analysis-type/analysis-type.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/analysis/area',
    pathMatch: 'full'
  },
  {
    path: 'analysis/area',
    component: AnalysisAreaComponent
  },
  {
    path: 'analysis/type',
    component: AnalysisTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}