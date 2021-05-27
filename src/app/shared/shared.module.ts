import {
  CategoryCardComponent,
  ProductCardComponent,
  ItemsCardComponent,
} from '@shared/components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { MappingPipe } from '@shared/pipes';
import { HoverDirective } from '@shared/directives';

import * as AppGlobals from 'app.globals';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const components = [
  ProductCardComponent,
  CategoryCardComponent,
  ItemsCardComponent,
];
const directives = [HoverDirective];
const pipes = [MappingPipe];

const material = [
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];
const bootstrap = [BsDropdownModule.forRoot(), AccordionModule.forRoot()];

@NgModule({
  declarations: [components, directives, pipes],
  imports: [
    material,
    bootstrap,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: AppGlobals.NOTIFICATION_DURATION,
        horizontalPosition: AppGlobals.NOTIFICATION_HORIZONTAL_POSITION,
        verticalPosition: AppGlobals.NOTIFICATION_VERTICAL_POSITION,
      },
    },
  ],
  exports: [
    TranslateModule,
    material,
    bootstrap,
    components,
    directives,
    pipes,
  ],
})
export class SharedModule {}
