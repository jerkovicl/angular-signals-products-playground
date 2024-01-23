import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  makeEnvironmentProviders,
  provideZoneChangeDetection,
} from '@angular/core';
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
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true, runCoalescing: true }),
    makeEnvironmentProviders([
      {
        provide: ErrorHandler,
        useClass: ErrorHandlerService,
      },
    ]),
    provideHttpClient(withInterceptors([AuthInterceptor, ErrorInterceptor])),
  ],
};
