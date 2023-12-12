import { createSelector } from '@ngrx/store';
import { EditorState } from '../editor.reducer';
import { WorkingNode } from '../../models/tree.models';

export const selectTrees = (state: EditorState) => state.trees;
export const selectAllTrees = createSelector(
  selectTrees,
  (trees) => trees.allTrees
);
export const selectCurrentTree = createSelector(
  selectTrees,
  (trees) => trees.currentTree
);
export const selectTreesError = createSelector(
  selectTrees,
  (trees) => trees.treesError
);
export const selectTreesLoading = createSelector(
  selectTrees,
  (trees) => trees.treesLoading
);
export const selectWorkingTree = createSelector(
  selectTrees,
  (trees) => trees.workingTree
);
export const selectTreeElements = createSelector(
  selectTrees,
  (trees) => trees.treeElements
);
export const selectLostElements = createSelector(
  selectTrees,
  (trees) => trees.lostElements
);
export const selectSelectedNumber = createSelector(
  selectTrees,
  (trees) => trees.selectedNumber
);
export const selectWorkingTreeError = createSelector(
  selectTrees,
  (trees) => trees.workingTreeError
);
export const selectWorkingTreeLoading = createSelector(
  selectTrees,
  (trees) => trees.workingTreeLoading
);
export const selectSelectedNode = createSelector(selectTrees, (trees) => {
  const node = trees.treeElements.get(trees.selectedNumber);
  if (node && 'true_number' in node) {
    return node;
  } else {
    return undefined;
  }
});
export const selectSelectedLeaf = createSelector(selectTrees, (trees) => {
  const leaf = trees.treeElements.get(trees.selectedNumber);
  if (leaf && 'result' in leaf) {
    return leaf;
  } else {
    return undefined;
  }
});
export const selectTreeElementByNumber = (elemNum: number) =>
  createSelector(selectTrees, (trees) => {
    return trees.treeElements.get(elemNum);
  });
export const selectPossibleSuccessors = createSelector(selectTrees, (trees) => {
  const node = trees.treeElements.get(trees.selectedNumber) as WorkingNode;
  const successors: [number, string][] = [];
  trees.lostElements.forEach((v, k) => {
    if ('result' in v) {
      successors.push([k, v.display_name]);
    } else {
      successors.push([k, v.display_name]);
    }
  });
  successors.push([0, 'kein Nachfolger']);
  if (node && 'true_number' in node) {
    if (node.true_number > 0) {
      const trueSuccessor = trees.treeElements.get(node.true_number);
      if (trueSuccessor && 'true_number' in trueSuccessor) {
        successors.push([node.true_number, trueSuccessor.display_name]);
      } else if (trueSuccessor) {
        successors.push([node.true_number, trueSuccessor.display_name]);
      }
    }
    if (node.false_number > 0) {
      const falseSuccessor = trees.treeElements.get(node.false_number);
      if (falseSuccessor && 'true_number' in falseSuccessor) {
        successors.push([node.false_number, falseSuccessor.display_name]);
      } else if (falseSuccessor) {
        successors.push([node.false_number, falseSuccessor.display_name]);
      }
    }
  }
  return successors;
});
export const selectAllForTreeOut = createSelector(selectTrees, (trees) => ({
  tree: trees.workingTree,
  elements: trees.treeElements,
}));
export const selectCurrentTreeVersion = createSelector(selectTrees, (trees) => {
  const indexOfCurrentTree = trees.allTrees.findIndex(
    (tree) => tree.id == trees.currentTree
  );
  if (indexOfCurrentTree >= 0) {
    return trees.allTrees[indexOfCurrentTree].tree_version;
  } else {
    return undefined;
  }
});
