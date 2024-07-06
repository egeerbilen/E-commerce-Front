import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeDataResolverService } from './service/home-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
    resolve: { resolvedData: HomeDataResolverService } // DataResolverServiceService bu servis içindeki -> resolve functionunu çaığrır
    // * Not: sol tarafta belirttiğin yer sağ tarafta belirttiğin servisin içindeki metodu çağırır (resolve metodunu)
    // * component de veriye erişmek için resolvedData yı kullanırsın
  }
];

export const homeRoutes = RouterModule.forChild(routes);
