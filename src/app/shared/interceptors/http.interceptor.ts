import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import {
  CommonService,
  LoadingService,
  NotificationService,
} from '@shared/services';

import { Observable, of, throwError } from 'rxjs';
import { concatMap, delay, finalize, retryWhen, tap } from 'rxjs/operators';

import { environment } from 'environments/environment';

import * as AppGlobals from 'app.globals';

@Injectable({ providedIn: 'root' })
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private commonService: CommonService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = this.commonService.currentLang;
    const isAPI = req.url.startsWith(environment.host);

    if (isAPI && lang) {
      // Only show loading bar if it is Loo Wear BE
      this.loadingService.showLoader({
        isLoading: true,
        type: 'progress',
      });
      req = req.clone({
        headers: req.headers.set('Accept-Language', lang),
      });
    }

    return next.handle(req).pipe(
      this._retry([
        AppGlobals.SERVER_DOWN_STATUS,
        AppGlobals.SERVER_UNAVAILABLE_STATUS,
      ]),
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            // Catch all responses
          }
        },
        (error: HttpErrorResponse) => {
          /*
          ?Catch all response error
          *Catch error in error.interceptor if possible
          */
          if (!environment.production) {
            console.log('HTTP INTERCEPTOR', error);
          }

          let message = error.message;

          if (error.status === AppGlobals.SERVER_DOWN_STATUS) {
            message = 'Server is unavailable!\nTry Again later!';
          }

          // Show notification
          // !notification stay in http interceptor
          // !in error interceptor there is flickering bug on notification position
          this.notificationService.notify(message, null, {
            panelClass: 'error',
          });
        }
      ),
      finalize(() => {
        if (isAPI) {
          this.loadingService.showLoader({
            isLoading: false,
            type: 'progress',
          });
        }
      })
    );
  }

  private _retry(
    retryFor: number[],
    delayFor: number = AppGlobals.RETRY_DELAY_LONG,
    maxRetry: number = AppGlobals.RETRY_COUNT
  ) {
    return retryWhen((error) => {
      return error.pipe(
        concatMap((error, count) => {
          if (count <= maxRetry && retryFor.includes(error.status)) {
            return of(error);
          }
          return throwError(error);
        }),
        delay(delayFor)
      );
    });
  }
}
