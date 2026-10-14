import { Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page';
import { ProjectsPage } from './pages/projects-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardPage, title: 'Dashboard | Audit Studio' },
  { path: 'projects', component: ProjectsPage, title: 'Projects | Audit Studio' },
  { path: '**', redirectTo: 'dashboard' },
];
