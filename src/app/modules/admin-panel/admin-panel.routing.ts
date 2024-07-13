import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {
    path: urlEnums.adminPanel,
    component: AdminPanelComponent,
    title: 'Admin Panel'
    // resolve: { resolvedData: HomeDataResolverService }
  }
];

export const adminPanelRoutes = RouterModule.forChild(routes);
