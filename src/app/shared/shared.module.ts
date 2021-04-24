import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const components = []
const directives = []

@NgModule({
  declarations: [
    components,
    directives
  ],
  imports: [
    CommonModule
  ],
  exports: [
    components,
    directives
  ]
})
export class SharedModule { }
