import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ConfigModel } from '@shared/models';

import { environment } from 'environments/environment';

@Injectable()
export class AppConfig {
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
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
