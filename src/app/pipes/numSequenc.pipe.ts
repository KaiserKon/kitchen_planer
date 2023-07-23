import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numSequence',
  standalone: true,
})
export class NumSequencePipe implements PipeTransform {
  transform(value: number): Array<number> {
    return Array.from({ length: value }, (_, i) => i + 1);
  }
}
