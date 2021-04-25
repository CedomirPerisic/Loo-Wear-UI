import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import { CommonService } from "@shared/services";

import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import { environment } from "environments/environment";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private commonService: CommonService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = this.commonService.currentLang;
    const isAPI = req.url.includes(environment.host)
    
    if (isAPI && lang) {
      req = req.clone({
        headers: req.headers.set('Accept-Language', lang)
      })
    }
    
    return next.handle(req)
      .pipe(
        tap((event: any) => {
          if(event instanceof HttpResponse) {
            // Catch all responses
          }
        }, error => {
          // Catch all response error
          console.log('HTTP INTERCEPTOR', error);
          if (error.status === 0) {
            // TODO: Uncomment this when server is up!
            // this.router.navigate(['error']);
          }
        }),
      );
  }
}