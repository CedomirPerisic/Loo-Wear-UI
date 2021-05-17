import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swimwear-card',
  templateUrl: './swimwear-card.component.html',
  styleUrls: ['./swimwear-card.component.scss']
})
export class SwimwearCardComponent implements OnInit {

  swimwearImg = '/assets/pictures/image-5.JPG';

  show = true;

  constructor() { }

  ngOnInit(): void {
  }

  addClass(event): void {
    event.target.className += 'myClass';
  }

  removeClass(event): void {
    event.target.className = event.target.className.replace('myClass', '');
  }

}
