import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: urlEnums.login,
    component: LoginComponent,
    canActivate: [AuthGuardService],
    title: 'Login'
  }
];

export const loginRoutes = RouterModule.forChild(routes);
