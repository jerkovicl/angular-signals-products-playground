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
    /*
    redirectTo: ({ queryParams }) => {
      const errorHandler = inject(ErrorHandler);
      const userIdParam = queryParams['userId'];
      if (userIdParam !== undefined) {
        return `/user/${userIdParam}`;
      } else {
        errorHandler.handleError(
          new Error('Attempted navigation to user page without user ID.')
        );
        return `/not-found`;
      }
    },
    */
    /*
    * with the use of RedirectCommand, the redirect to error page occurs without altering the browsers url
    canActivate: [
      () => {

        return new RedirectCommand(inject(Router).parseUrl('/error'), {
          skipLocationChange: true,
        });
      },
    ],
    */
    /*
    * By returning a RedirectCommand in resolvers, the router cancels the current navigation and redirects to the specified location.
    * It's worth noting that if multiple resolvers return a RedirectCommand, only the first one encountered during execution will be utilized.
    resolve: {
      redirectMe: () => {
        return new RedirectCommand(inject(Router).parseUrl('/login')
      }
    },resolve: {
      redirectMe: () => {
        return new RedirectCommand(inject(Router).parseUrl('/login')
      }
    },
    */
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
