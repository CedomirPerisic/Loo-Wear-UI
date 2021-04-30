import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routingAnimation } from '@shared/animations';

@Component({
  selector: 'app-outlet',
  templateUrl: './app-outlet.component.html',
  styleUrls: ['./app-outlet.component.scss'],
  animations: [routingAnimation],
})
export class AppOutletComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
