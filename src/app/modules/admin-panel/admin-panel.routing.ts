import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';

import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelDataResolverService } from './service/admin-panel-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.adminPanel,
    component: AdminPanelComponent,
    title: 'Admin Panel',
    canActivate: [AuthGuardService],
    resolve: { resolvedData: AdminPanelDataResolverService }
  }
];

export const adminPanelRoutes = RouterModule.forChild(routes);
