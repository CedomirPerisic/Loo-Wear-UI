import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { CollectionsComponent } from './collections.component';
import { CollectionRoutingModule } from './collection-routing.module';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [CommonModule, SharedModule, CollectionRoutingModule],
})
export class CollectionsModule {}
