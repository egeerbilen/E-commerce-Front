/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Tüm routerlar alt modüllerde ki routing.ts lerden geliyor
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  { path: 'ProductDetails/:id', loadChildren: () => import('./modules/product-details/product-details.module').then((m) => m.ProductDetailsModule) },
  { path: 'MyAccount', loadChildren: () => import('./modules/my-account/my-account.module').then((m) => m.MyAccountModule) },
  { path: 'Login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  { path: '**', loadChildren: () => import('./modules/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { useHash: true })], useHash, Angular uygulamalarında URL yönetimini etkileyen bir ayar seçeneğidir.
  exports: [RouterModule]
})
export class AppRoutingModule {}
