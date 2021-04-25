import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppErrorInterceptor implements ErrorHandler {

  constructor(){/* PROVIDE IN APP MODULE INSIDE DEPS ARRAY! */}

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
      console.warn('DEBUG: GlobalErrorHandler -> handleError -> errorMessage: ', errorMessage);
      console.warn('DEBUG: GlobalErrorHandler -> handleError -> error: ', error);
    }

    if (error instanceof HttpErrorResponse) {
      const httpError: HttpErrorResponse = error;
      if (httpError.status === 400) {
        errorMessage = error.error.message;
      }
    }

    return throwError(errorMessage);
  }
}