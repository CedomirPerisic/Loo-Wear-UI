import { Component, OnDestroy, OnInit } from '@angular/core';
import { routeAnimation } from '@app/shared/animations';
import { Collections } from '@app/shared/models';
import { CommonService } from '@app/shared/services';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit, OnDestroy {
  collectionImg = '/assets/pictures/image-10.JPG';
  collectionLoo2020 = 'Loo-2020';
  collectionLoo2021 = 'Loo-2021';

  collections: Collections[];

  constructor(private commonService: CommonService) {
    this.collections = this.commonService.config.collections;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
