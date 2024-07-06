import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
    title: 'Login'
  }
];

export const loginRoutes = RouterModule.forChild(routes);
