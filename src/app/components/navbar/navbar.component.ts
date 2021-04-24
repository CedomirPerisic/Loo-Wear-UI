import { Component, OnInit } from '@angular/core';

import * as AppGlobals from 'app.globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
  // styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = AppGlobals.APP_NAME;

  constructor() {}

  ngOnInit(): void {}

}
