import { RouterModule, Routes } from '@angular/router';
import { urlEnums } from 'src/app/enums/url-enums';

import { FavoritesComponent } from './favorites.component';
import { FavoritesDataResolverService } from './service/favorites-data-resolver.service';

const routes: Routes = [
  {
    path: urlEnums.favorites,
    component: FavoritesComponent,
    title: 'Favorites',
    resolve: { resolvedData: FavoritesDataResolverService }
  }
];

export const favoritesRoutes = RouterModule.forChild(routes);
