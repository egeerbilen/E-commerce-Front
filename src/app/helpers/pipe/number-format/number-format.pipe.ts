import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  /**
   * Transform.
   * @param value Value.
   * @param decimalPlaces DecimalPlaces.
   * @returns String.
   */
  public transform(value: number, decimalPlaces = 2): string {
    return value.toFixed(decimalPlaces);
  }
}
