import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnalysisAreaComponent } from './components/analysis-area/analysis-area.component';
import { AnalysisTypeComponent } from './components/analysis-type/analysis-type.component';

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