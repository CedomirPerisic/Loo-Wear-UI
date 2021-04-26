import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { CollectionsComponent } from './collections.component';



@NgModule({
  declarations: [
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CollectionsModule { }
