import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';

import { DiscordService } from '@shared/services';

import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AppErrorInterceptor implements ErrorHandler {
  constructor(private router: Router, private discordService: DiscordService) {
    /* PROVIDE IN APP MODULE INSIDE DEPS ARRAY! */
  }

  handleError(error: any): Observable<void> {
    let errorMessage = '';
    if (error) {
      if (error.message && error.message) {
        errorMessage = error.message;
      } else if (error.status && error.status) {
        errorMessage = `${error.status} - ${error.statusText}`;
      } else {
        errorMessage = 'Server error';
      }
    }

    if (!environment.production) {
      console.warn(
        'DEBUG: GlobalErrorHandler -> handleError -> errorMessage: ',
        errorMessage
      );
      console.warn(
        'DEBUG: GlobalErrorHandler -> handleError -> error: ',
        error
      );
    }

    if (error instanceof HttpErrorResponse) {
      const httpError: HttpErrorResponse = error;
      if (
        (httpError.status === 0 || httpError.status === 503) &&
        environment.production
      ) {
        // TODO: Change this after introduce server to others
        errorMessage =
          'Server is unavailable!\nHttp failure response for http://localhost:3000/';
        this.router.navigate(['error']);
      } else {
        if (httpError.status === 400) {
          errorMessage = error.error.message;
        }
        if (httpError.status === 500) {
          // TODO: Redirect to server error page
          // this.router.navigate(['error']);
        }
      }
    }

    if (environment.production) {
      this.discordService.sendErrorMessage(errorMessage);
    }

    return throwError(errorMessage);
  }
}
