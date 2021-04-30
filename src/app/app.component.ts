import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as AppGlobals from 'app.globals';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {
    // !Ony for testing purpose! Remove after implementing APIs
    this.http
      .get(environment.host, {
        headers: {
          'Accept-Language': 'sr',
        },
      })
      .subscribe((result) => console.log(result));
  }

  ngOnInit() {}
}
