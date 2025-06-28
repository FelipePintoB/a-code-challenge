import { Routes } from '@angular/router';

import { DataDetailsPageComponent } from '@dashboard/components';
import { DataRegistrationPageComponent } from '@registration/components';
import { MainLayoutComponent } from '@shared/components';

export const routes: Routes = [
  {
    title: 'Registration',
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: DataRegistrationPageComponent }],
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [{ path: '', component: DataDetailsPageComponent }],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
