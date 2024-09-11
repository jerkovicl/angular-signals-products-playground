import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  type GuardResult,
  type MaybeAsync,
} from '@angular/router';
import { AuthService } from './auth.service';

/**
 * guard as a const
 * @usageNotes  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard]},
 * @param _route
 * @param _state
 * @returns MaybeAsync<GuardResult>
 */
export const AuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): MaybeAsync<GuardResult> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn() ? true : router.parseUrl('/login');
  /*
  if (!authService.isLoggedIn()) {
    const targetOfCurrentNavigation: UrlTree | undefined =
      router.getCurrentNavigation()?.finalUrl;
    const redirect: UrlTree = router.parseUrl('/login');
    // Redirect to /login or /401 internally but display the original URL in the browser's address bar
    return new RedirectCommand(redirect, {
      browserUrl: targetOfCurrentNavigation,
    });
  }
  return true;
  */
};
