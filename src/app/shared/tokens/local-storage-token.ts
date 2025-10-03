import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, InjectionToken, PLATFORM_ID, inject } from '@angular/core';

function mockLocalStorage(): Storage {
  return {
    length: 0,
    key: () => null,
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  };
}
export const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>(
  'LOCAL_STORAGE_TOKEN',
  {
    factory: () => {
      const platformId = inject(PLATFORM_ID);
      const isBrowser = isPlatformBrowser(platformId);
      const document = inject(DOCUMENT);

      if (isBrowser) {
        return document.defaultView?.localStorage ?? mockLocalStorage();
      } else {
        return mockLocalStorage();
      }
    },
  },
);
