import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterModule } from './modules/footer/footer.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { MyAccountModule } from './modules/my-account/my-account.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { ProductDetailsModule } from './modules/product-details/product-details.module';
import { RegisterModule } from './modules/register/register.module';
import { UpdateProductModule } from './modules/update-product/update-product.module';
import { SharedModule } from './shared/shared-module/shared-module.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    LoginModule,
    NavbarModule,
    HomeModule,
    UpdateProductModule,
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
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // Optional: Set the default language to use for code blocks
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          javascript: () => import('highlight.js/lib/languages/javascript'),
          typescript: () => import('highlight.js/lib/languages/typescript')
          // Add other languages as needed
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
