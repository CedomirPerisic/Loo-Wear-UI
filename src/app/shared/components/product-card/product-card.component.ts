import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  productImg = '/assets/pictures/image-10.JPG';

  constructor() { }

  ngOnInit(): void {
  }

}
