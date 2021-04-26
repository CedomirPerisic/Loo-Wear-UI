import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http
      .get(environment.host, {
        headers: {
          'Accept-Language': 'sr',
        },
      })
      .subscribe((result) => console.log(result));
  }
}
