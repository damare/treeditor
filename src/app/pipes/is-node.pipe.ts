import { Pipe, PipeTransform } from '@angular/core';
import { WorkingLeaf, WorkingNode } from '../models/tree.models';

@Pipe({
  name: 'isNode',
})
export class IsNodePipe implements PipeTransform {
  transform(value: WorkingNode | WorkingLeaf): boolean {
    if ('true_number' in value) {
      return true;
    }
    return false;
  }
}
