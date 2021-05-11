import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapping',
})
export class MappingPipe implements PipeTransform {
  /**
   * Universal pipe for array mapping.
   *
   * @param value array to transform.S
   * @param mappingFunction custom function to transform array data.
   */
  transform(value: string[], mappingFunction: (value: string[]) => string[]): string[] {
    return mappingFunction(value);
  }
}
