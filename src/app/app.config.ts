import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  InjectionToken,
  makeEnvironmentProviders,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
  withI18nSupport,
} from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorHandlerService } from './shared/errors/error-handler.service';
import { ErrorInterceptor } from './shared/errors/error.interceptor';

export const CONFIG_TOKEN = new InjectionToken<ConfigOptions>('APP_CONFIG');
export const APP_DATA_TOKEN = new InjectionToken<AppData>('APP_DATA');
export interface ConfigOptions {
  apiUrl: string;
  theme: string;
  logging?: boolean;
  clientId?: string;
}
export interface AppData {
  userPreferences: {
    theme: string;
    language: string;
  };
  featureToggles: Record<string, boolean>;
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      // withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    // provideAnimationsAsync(),
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

export const buildAppConfig = async ({
  config,
  appData,
}: {
  config: ConfigOptions | undefined;
  appData: AppData;
}): Promise<ApplicationConfig> => {
  // load config providers based on config options
  // const loggingProviders = config.logging ? [await loadLoggingProviders()] : [];

  return {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(
        routes,
        withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
        // withEnabledBlockingInitialNavigation(),
        withComponentInputBinding(),
        withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      ),
      // provideAnimationsAsync(),
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
      // Provide the fetched config as a static value.
      // Any service can now inject it synchronously!
      { provide: CONFIG_TOKEN, useValue: config },
      { provide: APP_DATA_TOKEN, useValue: appData },
      // we can dynamically lazy load providers here!
      // ...loggingProviders,
    ],
  };
};

/* function loadLoggingProviders() {
    // lazy loading providers is great!
    return import('./logging.providers').then(m => m.loggingProviders);
} */

/**
 * Loads the app config from the JSON file via a browser-side fetch call.
 */
export function loadConfig(): Promise<ConfigOptions> {
  return fetch('./config.json').then((res) => res.json());
}
