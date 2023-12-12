import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comparisonToSign',
})
export class ComparisonToSignPipe implements PipeTransform {
  transform(value: string | undefined): string {
    switch (value) {
      case 'ST': {
        return '<';
      }
      case 'GT': {
        return '>';
      }
      case 'EQ': {
        return '=';
      }
      case 'NE': {
        return '!=';
      }
      default: {
        return '??';
      }
    }
  }
}
