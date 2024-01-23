import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * guard as a const
 * @usageNotes  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
 * @param _route
 * @param _state
 * @returns boolean | Observable<boolean> | UrlTree
 */
export const AuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | Observable<boolean> | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn() ? true : router.parseUrl('/login');
};
