
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SearchingComponent } from './components/searching/searching.component';

const appRoutes: Routes = [
    { path: 'home', component:  SearchingComponent },
    { path: '**', redirectTo: '/home' },
];

export const routing = RouterModule.forRoot(appRoutes);

