import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';

import { DiscordService } from '@shared/services';

import { environment } from 'environments/environment';

import * as AppGlobals from 'app.globals';

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
        httpError.status === AppGlobals.SERVER_DOWN_STATUS ||
        httpError.status === AppGlobals.SERVER_UNAVAILABLE_STATUS
      ) {
        // TODO: Change this after introduce server to others
        errorMessage = `Server is unavailable!`;
        if (!environment.production) {
          this.router.navigate(['server-error']);
        }
      } else {
        if (httpError.status === AppGlobals.BAD_REQUEST_STATUS) {
          errorMessage = error.error.message;
        }
        if (httpError.status === AppGlobals.SERVER_ERROR_STATUS) {
          // TODO: Redirect to server error page
          this.router.navigate(['server-error']);
        }
      }
    }

    if (environment.production) {
      this.discordService.sendErrorMessage(errorMessage);
    }

    return throwError(errorMessage);
  }
}
