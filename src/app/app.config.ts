import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideTranslateHttpLoader({
      loader: provideTranslateHttpLoader({prefix:'./i18n', suffix:'.json'}),
      fallbackLang: 'en'
    })
  ]
};
