import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Table } from './table/table';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'table', component: Table },
  { path: 'table/:id/:name/:category', component: Table },
  { path: '**', redirectTo: '' }
];
