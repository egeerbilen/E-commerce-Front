import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddProductModule } from './modules/add-product/add-product.module';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { BasketsModule } from './modules/baskets/baskets.module';
import { CategoryManagementModule } from './modules/category-management/category-management.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { FooterModule } from './modules/footer/footer.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { MyAccountModule } from './modules/my-account/my-account.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { ProductDetailsModule } from './modules/product-details/product-details.module';
import { ProductManagementModule } from './modules/product-management/product-management.module';
import { RegisterModule } from './modules/register/register.module';
import { UpdateProductModule } from './modules/update-product/update-product.module';
import { jwtModule } from './shared/jwt/jwt-token-module-settings';
import { SharedModule } from './shared/shared-module/shared-module.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    jwtModule,
    SharedModule,
    LoginModule,
    CategoryManagementModule,
    NavbarModule,
    AdminPanelModule,
    ProductManagementModule,
    HomeModule,
    FavoritesModule,
    BasketsModule,
    UpdateProductModule,
    AddProductModule,
    RegisterModule,
    MyAccountModule,
    ProductDetailsModule,
    FooterModule,
    StoreModule.forRoot({}),
    HighlightModule,
    // ! NotFoundPageModule hep bu sonda olmalıdır
    // NotFoundPageModule bu modül içinde NotFoundPageComponent (404) sayfası var. yani RouterModule.forChild(routes) içinden geliyor sona al yoksa diğer child ları ezer ve 404 sayfasını görürsün
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
