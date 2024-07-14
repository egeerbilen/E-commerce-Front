import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { BasketsModule } from './modules/baskets/baskets.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { FooterModule } from './modules/footer/footer.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { MyAccountModule } from './modules/my-account/my-account.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductDetailsModule } from './modules/product-details/product-details.module';
import { ProductManagementModule } from './modules/product-management/product-management.module';
import { RegisterModule } from './modules/register/register.module';
import { jwtModule } from './shared/jwt/jwt-token-module-settings';
import { SharedModule } from './shared/shared-module/shared-module.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // url lerde yanlış yonlendime olursa burada başka bir vurl verisinin daha onceden ilgili veriyi eezmediğiden emin ol
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    jwtModule,
    SharedModule,
    OrdersModule,
    HomeModule,
    LoginModule,
    NavbarModule,
    AdminPanelModule,
    ProductManagementModule,
    FavoritesModule,
    BasketsModule,
    RegisterModule,
    MyAccountModule,
    ProductDetailsModule,
    FooterModule,
    StoreModule.forRoot({}),
    // ! NotFoundPageModule hep bu sonda olmalıdır
    // NotFoundPageModule bu modül içinde NotFoundPageComponent (404) sayfası var. yani RouterModule.forChild(routes) içinden geliyor sona al yoksa diğer child ları ezer ve 404 sayfasını görürsün
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
