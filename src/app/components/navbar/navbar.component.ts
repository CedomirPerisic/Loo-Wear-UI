import { Component, OnInit, Input } from '@angular/core';

import * as AppGlobals from 'app.globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
  // styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() name: string;

  title = AppGlobals.APP_NAME;
  history = AppGlobals.APP_HISTORY;
  collections = AppGlobals.APP_COLLECTION;
  products = AppGlobals.APP_PRODUCTS;
  contact = AppGlobals.APP_CONTACT;
  media = AppGlobals.APP_MEDIA;

  open: boolean;

  constructor() {
    this.open = false;
  }

  ngOnInit(): void {}

}
