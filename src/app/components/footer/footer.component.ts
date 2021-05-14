import { Component, OnInit } from '@angular/core';
import { CommonService, NotificationService } from '@shared/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  arrToMap = ['hello', 'world', 'cedomire'];

  constructor(
    private commonService: CommonService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  changeLang(lang: string): void {
    this.commonService.changeLang(lang);
  }

  transformArray(value: string[]): string[] {
    return value.map((i) => '/' + i);
  }

  showNotification(): void {
    this.notificationService.notify('Success', 'DISMISS', {
      panelClass: 'success',
    });
  }
}
