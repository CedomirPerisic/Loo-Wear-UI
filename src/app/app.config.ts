import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { ConfigModel } from '@shared/models';
import { CommonService } from '@shared/services';

import { environment } from 'environments/environment';

import * as AppGlobals from 'app.globals';

@Injectable()
export class AppConfig {
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private commonService: CommonService
  ) {}

  init(): Promise<any> {
    const configSources = [
      // Multiple trusted source need to be manually added
      this.http
        .get<ConfigModel>(
          `/assets/config${environment.production ? '' : '.dev'}.json`
        )
        .pipe(retry(AppGlobals.RETRY_COUNT)),
    ];

    const promise = forkJoin(configSources)
      .pipe(
        catchError(() => {
          // Try to get config data from local storage if there is error
          const config = JSON.parse(localStorage.getItem('config'));
          return of([config]);
        })
      )
      .toPromise();

    promise.then((response: ConfigModel[]) => {
      let config = {} as ConfigModel;

      response.forEach((item: ConfigModel) => {
        // !Can be security issue!
        // But as we need all config data from server we can ignore this issue
        config = { ...config, ...item };
        this.commonService.config = config;
        if (!environment.production) {
          console.log('DEBUG: config data => ', this.commonService.config);
        }
      });

      this.translateConfig({
        langs: config.langs || ['en', 'sr'],
        defaultLang: config.defaultLang || 'en',
      });
    });

    return promise;
  }

  translateConfig(config: { langs: string[]; defaultLang: string }): void {
    let lang = localStorage.getItem('lang');

    if (!lang) {
      const browserLang = this.translate.getBrowserLang();
      lang = config.langs.includes(browserLang)
        ? browserLang
        : config.defaultLang;
    }

    this.translate.addLangs(config.langs);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
