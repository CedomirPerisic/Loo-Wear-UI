import { Component, OnInit } from '@angular/core';
import { Products } from '@app/shared/models';
import { CommonService } from '@shared/services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  productImg = '/assets/pictures/image-10.JPG';
  buttonName = 'Preview';
  labelName = 'Sold Out';
  name = 'Name';
  price = '30e';

  products: Products[];

  constructor(private commonService: CommonService) {
    this.products = this.commonService.config.products;
  }

  ngOnInit(): void {}
}
