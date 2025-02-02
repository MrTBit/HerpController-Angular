import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {BASE_URL} from '../const/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private secretKey = 'jwt';
  private refreshKey = 'refresh';

  private _cachedRequests: Array<HttpRequest<any>> = [];

  public readonly authSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem(this.secretKey);
  }

  login(username: string, password: string): void {
    const authString = btoa(`${username}:${password}`);
    this.http.post<TokenModel>(
      `${BASE_URL}/user/login`,
      undefined,
      {headers:
          {'authorization': `Basic ${authString}`}
      }
    ).subscribe((token) => this.setAuthenticated(true, token));
  }

  setAuthenticated(authenticated: boolean, tokenModel?: TokenModel): void {
    if (authenticated && tokenModel) {
      localStorage.setItem(this.secretKey, tokenModel.token);
      localStorage.setItem(this.refreshKey, tokenModel.refreshToken);
      this.isAuthenticated = true;
      this.authSubject.next(true);
    } else if (!authenticated) {
      localStorage.removeItem(this.secretKey);
      localStorage.removeItem(this.refreshKey);
      this.isAuthenticated = false;
      this.authSubject.next(false);
    }
  }

  refreshLogin(): Observable<TokenModel | undefined> {
    const refreshToken = localStorage.getItem(this.refreshKey);
    if (!refreshToken) {
      return of(undefined);
    }

    return this.http.post<TokenModel>(
      `${BASE_URL}/user/login`,
      undefined,
      {headers:
          {'RefreshToken': refreshToken}
      }
    );
  }

  logout(): void {
    this.setAuthenticated(false, undefined);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string {
    return localStorage.getItem(this.secretKey) ?? "";
  }

  collectFailedRequest(request: HttpRequest<any>): void {
    this._cachedRequests.push(request);
  }

  retryFailedRequests(): void {

  }
}

export interface TokenModel {
  token: string;
  refreshToken: string;
}
