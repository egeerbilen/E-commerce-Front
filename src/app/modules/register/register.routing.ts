import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: urlEnums.register,
    component: RegisterComponent,
    title: 'Register'
  }
];

export const registerRoutes = RouterModule.forChild(routes);
