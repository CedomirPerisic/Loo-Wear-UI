import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as AppGlobals from 'app.globals';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  showLoader$ = new BehaviorSubject<LoaderData>({
    isLoading: AppGlobals.LOADING_INIT_STATE,
    type: null,
  });
  history = new Map<LoaderType, boolean>();

  constructor() {}

  showLoader(showLoader: LoaderData): void {
    if (showLoader.isLoading) {
      this.history.set(showLoader.type, showLoader.isLoading);
    } else if (this.history.has(showLoader.type)) {
      this.history.delete(showLoader.type);
    }

    // Set visible only at first request
    if (this.history.size === 1) {
      this.showLoader$.next(showLoader);
    }

    // Set unvisitable only if there is no active request
    if (this.history.size === 0) {
      this.showLoader$.next(showLoader);
    }
  }
}

export type LoaderType = 'progress' | 'spinner' | null;

export interface LoaderData {
  isLoading: boolean;
  type: LoaderType;
}
