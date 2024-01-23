import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserLogin } from './auth.model';

export const BYPASS_AUTH_HEADER = new HttpContextToken(() => false);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = 'https://dummyjson.com/auth';
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  login(body: UserLogin): Observable<User> {
    return this.httpClient.post(`${this.baseUrl}/login`, body, {
      context: new HttpContext().set(BYPASS_AUTH_HEADER, true),
    }) as Observable<User>;
  }

  getUser(): Observable<User> {
    return this.httpClient.get(`${this.baseUrl}/me`) as Observable<User>;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Check if user is logged in
   * oversimplified version
   */
  public isLoggedIn(): boolean {
    try {
      return this.getToken() !== null;
    } catch (error) {
      return false;
    }
  }
}
