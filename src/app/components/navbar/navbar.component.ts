import {
  AfterViewChecked,
  Component,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '@shared/services';
import { Navigation } from '@shared/models';

import * as AppGlobals from 'app.globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  title = AppGlobals.APP_NAME;
  navigation: Navigation[];

  isTransparent = true;
  show = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isTransparent =
      this.router.url === AppGlobals.BASE_URL &&
      window.pageYOffset <= AppGlobals.NAVBAR_OFFSET;
  }

  @HostListener('window:resize')
  inResize(): void {
    if (window.innerWidth > AppGlobals.BREAKPOINT_MD) {
      this.show = false;
    }
  }

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private commonService: CommonService
  ) {
    this.navigation = this.commonService.config.navigation;
  }

  ngAfterViewChecked(): void {
    this.onScroll();
  }

  toggleNavbar(): void {
    this.show = !this.show;
    if (this.show) {
      this.renderer.addClass(document.body, 'disable-scroll');
    } else {
      this.renderer.removeClass(document.body, 'disable-scroll');
    }
  }

  disableClick(event: Event): void {
    event.stopPropagation();
  }

  ngOnInit(): void {}
}
