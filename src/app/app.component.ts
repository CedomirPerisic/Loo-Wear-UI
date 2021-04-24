import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/', {
      headers: {
        'Accept-Language': 'sr'
      }
    }).subscribe(
      result => console.log(result)
    )
  }

  title = 'loo-wear';
}
