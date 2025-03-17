import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RedactorPageComponent } from './components/redactor-page/redactor-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'redactor',
    component: RedactorPageComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
