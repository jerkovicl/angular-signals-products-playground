import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  buildAppConfig,
  type AppData,
  type ConfigOptions,
} from './app/app.config';

declare global {
  interface Window {
    loadConfigPromise: Promise<ConfigOptions>;
  }
}

window['loadConfigPromise'] // we still get the promise from the index.html file
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then((response: any) => response)
  .then(async (config) => {
    // 1. Fetch additional, user-specific data here!
    // const appData = await loadAppData(config); // Uses cookies to load data!
    const appData: AppData = {
      userPreferences: {
        theme: 'dark',
        language: 'en-US',
      },
      featureToggles: { login: true },
    }; // No user-specific data for now

    // 2. Build our application config dynamically! We can add providers dynamically here!
    const appConfig = await buildAppConfig({ config, appData });

    // 3. Bootstrap the app ONLY after everything is ready
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch((err) => console.error(err));
