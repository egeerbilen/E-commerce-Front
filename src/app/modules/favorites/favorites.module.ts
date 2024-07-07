import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

import { FavoritesComponent } from './favorites.component';
import { favoritesRoutes } from './favorites.routing';

@NgModule({
  imports: [favoritesRoutes, CommonModule, SharedModule],
  declarations: [FavoritesComponent]
})
export class FavoritesModule {}
