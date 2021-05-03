import { Component, Input, OnInit } from '@angular/core';
import { delay, distinct } from 'rxjs/operators';

import { LoaderData, LoadingService } from '@shared/services';

import * as AppGlobals from 'app.globals';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  showSpinner = AppGlobals.LOADING_INIT_STATE;
  showProgress = AppGlobals.LOADING_INIT_STATE;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.showLoader$
      .pipe(distinct(), delay(0))
      .subscribe((data: LoaderData) => {
        if (data.type === 'progress') {
          this.showProgress = data.isLoading;
        } else if (data.type === 'spinner') {
          this.showSpinner = data.isLoading;
        }
      });
  }
}
