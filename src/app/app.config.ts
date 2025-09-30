import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  makeEnvironmentProviders,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withI18nSupport,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorHandlerService } from './shared/error-handler.service';
import { ErrorInterceptor } from './shared/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideAnimationsAsync(),
    provideZonelessChangeDetection(),
    // provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    makeEnvironmentProviders([
      {
        provide: ErrorHandler,
        useClass: ErrorHandlerService,
      },
    ]),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor, ErrorInterceptor]),
    ),
    provideClientHydration(withEventReplay(), withI18nSupport()),
  ],
};
