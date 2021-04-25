import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({providedIn: 'root'})
export class CommonService {
  constructor(
    private translate: TranslateService
  ) {}

  // Translate
  changeLang(lang: string) {
    if (this.translate.langs.includes(lang) && lang !== this.currentLang) {
      this.translate.use(lang);

      localStorage.setItem('lang', lang);

      // To involve BE translations
      window.location.reload();
    }
  }

  public get langs() : string[] {
    return this.translate.langs;
  }

  public get currentLang() : string {
    return this.translate.currentLang;
  }
  
}