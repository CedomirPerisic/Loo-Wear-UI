import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

import * as AppGlobals from 'app.globals';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  notify(
    message: string,
    action?: Action,
    options?: NotificationOptions
  ): MatSnackBarRef<any> {
    options = options || ({} as NotificationOptions);

    if (action === 'DISMISS') {
      options.duration = 0;
    }

    return this.snackBar.open(message, action, options);
  }
}

export type Action = 'DISMISS' | 'RELOAD' | null;

export class NotificationOptions extends MatSnackBarConfig {
  panelClass: 'error' | 'warning' | 'success';
}
