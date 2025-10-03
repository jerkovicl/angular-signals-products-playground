import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from '../tokens/local-storage-token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  #storage = inject(LOCAL_STORAGE_TOKEN);

  readonly enabled = isPlatformBrowser(inject(PLATFORM_ID));

  get length() {
    return this.#storage.length;
  }

  clear() {
    this.#storage.clear();
  }
  getItem(key: string) {
    return this.#storage.getItem(key);
  }
  key(index: number) {
    return this.#storage.key(index);
  }
  removeItem(key: string): void {
    this.#storage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this.#storage.setItem(key, value);
  }
}
