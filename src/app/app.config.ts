import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { retry } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { ConfigModel } from '@shared/models';

import { environment } from 'environments/environment';
import { CommonService } from './shared/services';

import * as AppGlobals from 'app.globals';

@Injectable()
export class AppConfig {
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private commonService: CommonService
  ) {}

  translateConfig(config: { langs: string[]; defaultLang: string }) {
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

  init() {
    const promise = this.http
      .get(`/assets/config${environment.production ? '' : '.dev'}.json`)
      .pipe(retry(AppGlobals.RETRY_COUNT))
      .toPromise();

    promise.then((response: ConfigModel) => {
      this.translateConfig({
        langs: response.langs || ['en', 'sr'],
        defaultLang: response.defaultLang || 'en',
      });
    });

    return promise;
  }
}
