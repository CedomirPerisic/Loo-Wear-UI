import { Component, OnInit } from '@angular/core';
import { routeAnimation } from '@shared/animations';

@Component({
  selector: 'app-outlet',
  templateUrl: './app-outlet.component.html',
  styleUrls: ['./app-outlet.component.scss'],
  animations: [routeAnimation],
})
export class AppOutletComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
