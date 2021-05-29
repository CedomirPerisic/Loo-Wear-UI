import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-card',
  templateUrl: './items-card.component.html',
  styleUrls: ['./items-card.component.scss'],
})
export class ItemsCardComponent implements OnInit {
  // itemsImg = '/assets/pictures/image-10.JPG';
  slika = '/assets/pictures/image-7.JPG';

  constructor() {}

  ngOnInit(): void {}
}
