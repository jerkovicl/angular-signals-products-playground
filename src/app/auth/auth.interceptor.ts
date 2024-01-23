import {
  HttpHandlerFn,
  HttpHeaderResponse,
  HttpInterceptorFn,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, BYPASS_AUTH_HEADER } from './auth.service';

/**
 * Intercepts every httpRequest and adds tWoken to header
 * @param reqW
 * @param next
 * @returns Observable<any>
 */
export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<
  | HttpSentEvent
  | HttpHeaderResponse
  | HttpProgressEvent
  | HttpResponse<any>
  | HttpUserEvent<any>
> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  // assets don't need a token to be loaded
  // skip adding auth header if bypass header is set to true
  if (
    req.url.includes('assets') ||
    req.context.get(BYPASS_AUTH_HEADER) === true
  ) {
    return next(req);
  }

  const token = authService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return next(req);
  }
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
