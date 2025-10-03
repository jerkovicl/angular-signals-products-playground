import { REQUEST } from '@angular/core';
import {
  bootstrapApplication,
  BootstrapContext,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { loadConfig, type AppData, type ConfigOptions } from './app/app.config';
import { buildServerConfig } from './app/app.config.server';

const fallbackConfig: ConfigOptions = {
  theme: 'default',
  apiUrl: '/api/default',
  clientId: 'default',
};

async function safeLoadConfig() {
  try {
    return await loadConfig();
  } catch {
    return fallbackConfig;
  }
}

const bootstrap = async (context: BootstrapContext) => {
  const injector = context.platformRef.injector;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const request = injector.get(REQUEST);

  // we fetch the config.json here
  const config = await safeLoadConfig();

  // Now, we can use cookies to load data that are user specific
  // because we have the request object
  // const appData = await loadAppData(request);
  const appData: AppData = {
    userPreferences: {
      theme: 'dark',
      language: 'en-US',
    },
    featureToggles: { login: true },
  }; // No user-specific data for now

  // we can pass the config and app data to the server config builder
  // and get the final application config
  const serverConfig = await buildServerConfig({ config, appData });

  // and bootstrap the application with the final application config
  return bootstrapApplication(AppComponent, serverConfig, context);
};
export default bootstrap;
