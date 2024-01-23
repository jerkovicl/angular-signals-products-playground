import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    loadComponent: async () =>
      (await import('./products/products-list/products-list.component'))
        .ProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id/edit',
    loadComponent: async () =>
      (await import('./products/product-form/product-form.component'))
        .ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/add',
    loadComponent: async () =>
      (await import('./products/product-form/product-form.component'))
        .ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: async () =>
      (await import('./auth/login-form/login-form.component'))
        .LoginFormComponent,
  },
];
