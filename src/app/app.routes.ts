import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home';
import { AnalysisPageComponent } from './pages/analysis';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'analyze', component: AnalysisPageComponent },
  { path: '**', redirectTo: '' }
];
