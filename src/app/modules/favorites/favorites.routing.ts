import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { FavoritesDataResolverService } from './service/favorites-data-resolver.service';

const routes: Routes = [
  {
    path: 'Favorites',
    component: FavoritesComponent,
    title: 'Favorites',
    resolve: { resolvedData: FavoritesDataResolverService }
  }
];

export const favoritesRoutes = RouterModule.forChild(routes);
