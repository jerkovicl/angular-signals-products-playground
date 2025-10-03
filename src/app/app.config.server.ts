import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { buildAppConfig, type AppData, type ConfigOptions } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

const configCache = new Map<string, ConfigOptions>();

export const buildServerConfig = async ({
  config,
  appData,
}: {
  config: ConfigOptions;
  appData: AppData;
}): Promise<ApplicationConfig> => {
  const clientId = config.clientId || 'default';

  if (!configCache.has(clientId)) {
    configCache.set(clientId, config);
  }

  const cachedConfig = configCache.get(clientId);
  const finalConfig = await buildAppConfig({ config: cachedConfig, appData });
  return mergeApplicationConfig(finalConfig, serverConfig);
};

// export const config = mergeApplicationConfig(appConfig, serverConfig);
