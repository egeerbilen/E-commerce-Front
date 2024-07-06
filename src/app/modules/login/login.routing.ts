import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
    title: 'Login'
  }
];

export const loginRoutes = RouterModule.forChild(routes);
