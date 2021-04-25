import { Component, OnInit } from '@angular/core';
import { CommonService } from '@shared/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
  // styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {}

  changeLang(lang: string) {
    this.commonService.changeLang(lang);
  }

}
