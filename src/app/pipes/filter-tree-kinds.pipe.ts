import { Pipe, PipeTransform } from '@angular/core';
import { TreeShort } from '../models/tree.models';

@Pipe({ name: 'filterTreeKinds' })
export class FilterTreeKindsPipe implements PipeTransform {
  transform(allTrees: TreeShort[], id = 1) {
    return allTrees.filter((tree) => tree.tree_version.kind_of_tree == id);
  }
}
