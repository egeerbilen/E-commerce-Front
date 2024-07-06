import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environment.prod';

import { InterceptorService } from '../services/interceptor/interceptor.service';

export const httpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true
};

// JwtModule.forRoot içerisinde ek yapılandırma
export const jwtModule = JwtModule.forRoot({
  config: {
    tokenGetter: () => {
      return localStorage.getItem('bearer_token');
    },
    allowedDomains: [environment.apiUrl], // Bu özellik, JWT'nin hangi alanlardan (domains) gelen isteklere izin verileceğini belirtir.
    // Bu, sunucunun sadece belirli güvenli domainlerden gelen isteklere cevap vermesini sağlayarak
    disallowedRoutes: [environment.apiUrl + 'user'] // disallowedRoutes içinde belirtilen bir rotaya istek atarsanız, JWT tokeni bu istekte kullanılmayacaktır.
  }
});
