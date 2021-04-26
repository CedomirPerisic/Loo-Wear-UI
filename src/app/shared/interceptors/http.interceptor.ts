import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { CommonService } from '@shared/services';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lang = this.commonService.currentLang;
    const isAPI = req.url.includes(environment.host);

    if (isAPI && lang) {
      req = req.clone({
        headers: req.headers.set('Accept-Language', lang),
      });
    }

    return next.handle(req).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            // Catch all responses
          }
        },
        (error) => {
          // ?Catch all response error
          // *Catch error in error.interceptor if possible
          // if (!environment.production) {
          //   console.log('HTTP INTERCEPTOR', error);
          // }
        }
      )
    );
  }
}
