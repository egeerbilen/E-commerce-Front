/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { urlEnums } from './enums/url-enums';

const routes: Routes = [
  // Tüm routerlar alt modüllerde ki routing.ts lerden geliyor
  { path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  {
    path: urlEnums.productDetails + '/:id',
    loadChildren: () => import('./modules/product-details/product-details.module').then((m) => m.ProductDetailsModule)
  },
  {
    path: urlEnums.updateProduct + '/:id',
    loadChildren: () => import('./modules/update-product/update-product.module').then((m) => m.UpdateProductModule)
  },
  { path: urlEnums.favorites, loadChildren: () => import('./modules/favorites/favorites.module').then((m) => m.FavoritesModule) },
  { path: urlEnums.addProduct, loadChildren: () => import('./modules/add-product/add-product.module').then((m) => m.AddProductModule) },
  { path: urlEnums.basket, loadChildren: () => import('./modules/baskets/baskets.module').then((m) => m.BasketsModule) },
  { path: urlEnums.register, loadChildren: () => import('./modules/register/register.module').then((m) => m.RegisterModule) },
  { path: urlEnums.myAccount, loadChildren: () => import('./modules/my-account/my-account.module').then((m) => m.MyAccountModule) },
  {
    path: urlEnums.categoryManagement,
    loadChildren: () => import('./modules/category-management/category-management.module').then((m) => m.CategoryManagementModule)
  },
  { path: urlEnums.adminPanel, loadChildren: () => import('./modules/admin-panel/admin-panel.module').then((m) => m.AdminPanelModule) },
  { path: urlEnums.login, loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  { path: '**', loadChildren: () => import('./modules/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash: true })], useHash, Angular uygulamalarında URL yönetimini etkileyen bir ayar seçeneğidir.
  exports: [RouterModule]
})
export class AppRoutingModule {}
