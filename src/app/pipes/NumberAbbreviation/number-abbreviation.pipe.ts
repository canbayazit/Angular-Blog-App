import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberAbbreviation'
})
export class NumberAbbreviationPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === undefined) {
      return 'N/A';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    } else {
      return value.toString();
    }
  }
}
