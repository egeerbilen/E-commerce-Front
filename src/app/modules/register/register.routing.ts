import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: 'Register',
    component: RegisterComponent,
    title: 'Register'
  }
];

export const registerRoutes = RouterModule.forChild(routes);
