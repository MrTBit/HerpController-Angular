import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService, TokenModel} from './auth.service';
import {BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, tap, throwError} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }})
  }

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(
      {
        next: (httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          //do nothing
        }
      },
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            const responseError = err as HttpErrorResponse;
            if (responseError.status === 401) {
              this.handle401Error(req, next);
            }
          }
        }
      }));
    }

  // this is all copy-pasta'd I have no idea what's going on here
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshLogin()
        .pipe(switchMap((newToken: TokenModel | undefined) => {
          if (newToken?.token) {
            this.tokenSubject.next(newToken.token);
            this.authService.setAuthenticated(true, newToken);
            return next.handle(this.addToken(req, newToken.token));
          }

          // If we don't get a new token, we are in trouble so logout.
          this.authService.setAuthenticated(false);
          return throwError(() => new Error('Failed to refresh token'));
        })).pipe(catchError(_ => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          this.authService.setAuthenticated(false);
          return throwError(() => new Error('Failed to refresh token'));
        })).pipe(finalize(() => {
          this.isRefreshingToken = false;
        })).subscribe();
    } else {
      return this.tokenSubject
        .pipe(filter(token => token != null)).pipe(
        take(1)).pipe(
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        }));
    }
  }

  }
