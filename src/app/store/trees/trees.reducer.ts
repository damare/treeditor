import { createReducer, on } from '@ngrx/store';
import {
  TreeShort,
  WorkingLeaf,
  WorkingNode,
  WorkingTree,
} from '../../models/tree.models';
import * as TreesActions from './trees.actions';

export interface TreesState {
  allTrees: TreeShort[];
  currentTree: number;
  treesError: string;
  treesLoading: boolean;
  workingTree?: WorkingTree;
  treeElements: Map<number, WorkingNode | WorkingLeaf>;
  lostElements: Map<number, WorkingNode | WorkingLeaf>;
  selectedNumber: number;
  workingTreeError: string;
  workingTreeLoading: boolean;
}

export const initialTreesState: TreesState = {
  allTrees: [],
  currentTree: 0,
  treesError: '',
  treesLoading: false,
  workingTree: undefined,
  treeElements: new Map<number, WorkingNode | WorkingLeaf>(),
  lostElements: new Map<number, WorkingNode | WorkingLeaf>(),
  selectedNumber: 0,
  workingTreeError: '',
  workingTreeLoading: false,
};

function createNodeLeafObject(
  nodes: WorkingNode[],
  leafs: WorkingLeaf[]
): Map<number, WorkingNode | WorkingLeaf> {
  const temp = new Map<number, WorkingNode | WorkingLeaf>();
  [...nodes, ...leafs].forEach((element) => {
    temp.set(element.number, element);
  });
  return temp;
}

type MoveElementOutOfTree = [
  Map<number, WorkingNode | WorkingLeaf>,
  Map<number, WorkingNode | WorkingLeaf>,
];
function moveElementFromTo(
  fromElements: Map<number, WorkingNode | WorkingLeaf>,
  toElements: Map<number, WorkingNode | WorkingLeaf>,
  num: number
): MoveElementOutOfTree {
  // when to stop recursion? num = leaf, num = node && num.true_number = 0 && num.false_number = 0
  if (num == 0) {
    return [fromElements, toElements];
  }
  // is element to be moved a leaf or o node?
  const toMove = fromElements.get(num);
  if (toMove) {
    if ('true_number' in toMove) {
      // we have a node
      // get rid of true successor
      [fromElements, toElements] = moveElementFromTo(
        fromElements,
        toElements,
        toMove.true_number
      );
      // get rid of false successor
      [fromElements, toElements] = moveElementFromTo(
        fromElements,
        toElements,
        toMove.false_number
      );
      // now move the node without connections to elements
      toElements.set(num, { ...toMove, true_number: 0, false_number: 0 });
    } else {
      // we have a leaf, move it to the elements
      toElements.set(num, { ...toMove });
    }
    // we still need to remove the element from the fromElements
    fromElements.delete(num);
  }
  return [fromElements, toElements];
}

function whatIsTheNextNumber(
  treeElements: Map<number, WorkingNode | WorkingLeaf>,
  lostElements: Map<number, WorkingNode | WorkingLeaf>
): number {
  return (
    [...treeElements.keys(), ...lostElements.keys()]
      .sort((a, b) => a - b)
      .reverse()[0] + 1
  );
}

function createNewNode(id: number): WorkingNode {
  return {
    number: id,
    display_name: id == 1 ? 'Wurzel' : 'Knoten',
    description: '',
    data_type: 0,
    data_value: '',
    comparison: '',
    list_comparison: '',
    explanation: '',
    true_number: 0,
    true_explanation: '',
    true_color: 0,
    false_number: 0,
    false_explanation: '',
    false_color: 0,
  };
}

function createNewLeaf(id: number): WorkingLeaf {
  return {
    number: id,
    display_name: 'Ergebnis',
    result: false,
    color: 0,
  };
}

function addSuccessorToNode(
  result: boolean,
  nextNumber: number,
  node: WorkingNode
): WorkingNode {
  if (result) {
    return { ...node, true_number: nextNumber };
  } else {
    return { ...node, false_number: nextNumber };
  }
}

function findParentAndDisconnect(
  dict: Map<number, WorkingNode | WorkingLeaf>,
  num: number
): Map<number, WorkingNode | WorkingLeaf> {
  dict.forEach((v, k) => {
    if ('true_number' in v) {
      if (v.true_number == num) {
        dict.set(k, { ...v, true_number: 0 });
      } else if (v.false_number == num) {
        dict.set(k, { ...v, false_number: 0 });
      }
    }
  });
  return dict;
}

function generateWorkingTree(kindId: number): WorkingTree {
  return {
    created_by: '',
    kind_of_tree: kindId,
    root: 1,
  };
}

export const treesReducer = createReducer(
  initialTreesState,
  // loading things
  on(TreesActions.loadTrees, (state) => ({
    ...state,
    allTrees: [],
    treesLoading: true,
  })),
  on(TreesActions.loadTreesSuccess, (state, { trees }) => ({
    ...state,
    allTrees: trees,
    treesError: '',
    treesLoading: false,
  })),
  on(TreesActions.loadTreesFailure, (state, { error }) => ({
    ...state,
    treesError: error,
    treesLoading: false,
  })),
  on(TreesActions.loadTreeById, (state, { id }) => ({
    ...state,
    currentTree: id,
    workingTree: undefined,
    treeElements: new Map<number, WorkingNode | WorkingLeaf>(),
    lostElements: new Map<number, WorkingNode | WorkingLeaf>(),
    workingTreeLoading: true,
  })),
  on(TreesActions.loadTreeByIdSuccess, (state, { tree }) => ({
    ...state,
    workingTreeError: '',
    workingTreeLoading: false,
    workingTree: { ...tree, nodes: [], leafs: [] },
    treeElements: createNodeLeafObject(tree.nodes, tree.leafs),
  })),
  on(TreesActions.loadTreeByIdFailure, (state, { error }) => ({
    ...state,
    workingTreeError: error,
    workingTreeLoading: false,
  })),
  on(TreesActions.saveTree, (state, { isMajor }) => ({
    ...state,
    treesLoading: true,
  })),
  on(TreesActions.saveTreeSuccess, (state, { tree }) => ({
    ...state,
    allTrees: [...state.allTrees, tree],
    treesLoading: false,
    treesError: '',
  })),
  on(TreesActions.saveTreeFailure, (state, { error }) => ({
    ...state,
    treesError: error,
    treesLoading: false,
  })),
  // UI state
  on(TreesActions.selectElement, (state, { selectedNumber }) => ({
    ...state,
    selectedNumber: state.treeElements.has(selectedNumber) ? selectedNumber : 0,
  })),
  on(TreesActions.unselectElement, (state) => ({
    ...state,
    selectedNumber: 0,
  })),
  // changing tree things
  on(TreesActions.updateNode, (state, { node }) => {
    const oldNode = state.treeElements.get(node.number) as WorkingNode;
    let newlyLost = 0;
    let newlyFound = 0;
    // if successor was changed, take note which to where
    if (oldNode.true_number != node.true_number) {
      newlyLost = oldNode.true_number; // before 0 -> stays 0, before x -> x is lost
      newlyFound = node.true_number; // now 0 -> stays 0, now x -> x is found
    } else if (oldNode.false_number != node.false_number) {
      // same for the other side
      newlyLost = oldNode.false_number;
      newlyFound = node.false_number;
    }
    let newTreeElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements
    );
    let newLostElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.lostElements
    );
    // if sth was found, move it from lost to found
    if (newlyFound != 0) {
      [newLostElements, newTreeElements] = moveElementFromTo(
        newLostElements,
        newTreeElements,
        newlyFound
      );
    }
    // if sth was lost, move it from elements to lost
    if (newlyLost != 0) {
      [newTreeElements, newLostElements] = moveElementFromTo(
        newTreeElements,
        newLostElements,
        newlyLost
      );
    }
    // now update the node itself
    newTreeElements.set(node.number, node);
    return {
      ...state,
      treeElements: newTreeElements,
      lostElements: newLostElements,
    };
  }),
  on(TreesActions.updateLeaf, (state, { leaf }) => ({
    ...state,
    treeElements: new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements.set(leaf.number, leaf)
    ),
  })),
  on(TreesActions.addNewNode, (state, { parentNum, result }) => {
    const nextNumber = whatIsTheNextNumber(
      state.treeElements,
      state.lostElements
    );
    const newNode = createNewNode(nextNumber);
    // get parent and update their successor property
    const parent = addSuccessorToNode(
      result,
      nextNumber,
      state.treeElements.get(parentNum) as WorkingNode
    );
    // add the new element and parent to the tree
    const newTreeElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements
    );
    newTreeElements.set(nextNumber, newNode);
    newTreeElements.set(parentNum, parent);
    return { ...state, treeElements: newTreeElements };
  }),
  on(TreesActions.addNewLeaf, (state, { parentNum, result }) => {
    const nextNumber = whatIsTheNextNumber(
      state.treeElements,
      state.lostElements
    );
    const newLeaf = createNewLeaf(nextNumber);
    // get parent and update their successor property
    const parent = addSuccessorToNode(
      result,
      nextNumber,
      state.treeElements.get(parentNum) as WorkingNode
    );
    // add new element and parent to the tree
    const newTreeElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements
    );
    newTreeElements.set(nextNumber, newLeaf);
    newTreeElements.set(parentNum, parent);
    return { ...state, treeElements: newTreeElements };
  }),
  on(TreesActions.changeLeafToNode, (state, { num }) => ({
    ...state,
    selectedNumber: 0,
    treeElements: new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements.set(num, createNewNode(num))
    ),
  })),
  on(TreesActions.changeNodeToLeaf, (state, { num }) => {
    // remove successors if any
    const oldNode = state.treeElements.get(num);
    let newTreeElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements
    );
    let newLostElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.lostElements
    );
    // check if this is really a node
    if (oldNode && 'true_number' in oldNode) {
      if (oldNode.true_number > 0) {
        // we have a true successor and we move it to the lost elements
        [newTreeElements, newLostElements] = moveElementFromTo(
          newTreeElements,
          newLostElements,
          oldNode.true_number
        );
      }
      if (oldNode.false_number > 0) {
        // we have a false successor and we move it to the lost elements
        [newTreeElements, newLostElements] = moveElementFromTo(
          newTreeElements,
          newLostElements,
          oldNode.false_number
        );
      }
      // we change the node to a leaf
      return {
        ...state,
        selectedNumber: 0,
        treeElements: newTreeElements.set(num, createNewLeaf(num)),
        lostElements: newLostElements,
      };
    }
    return { ...state };
  }),
  on(TreesActions.deleteNode, (state, { num }) => {
    const toDelete = state.treeElements.get(num);
    let newTreeElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements
    );
    let newLostElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.lostElements
    );
    if (toDelete && 'true_number' in toDelete) {
      // disconnect successors
      [newTreeElements, newLostElements] = moveElementFromTo(
        newTreeElements,
        newLostElements,
        toDelete.true_number
      );
      [newTreeElements, newLostElements] = moveElementFromTo(
        newTreeElements,
        newLostElements,
        toDelete.false_number
      );
      // find parent and disconnect the node to be deleted
      newTreeElements = findParentAndDisconnect(newTreeElements, num);
      newTreeElements.delete(num);
      return {
        ...state,
        treeElements: newTreeElements,
        lostElements: newLostElements,
        selectedNumber: 0,
      };
    }
    return { ...state };
  }),
  on(TreesActions.deleteLeaf, (state, { num }) => {
    let newTreeElements = new Map<number, WorkingNode | WorkingLeaf>(
      state.treeElements
    );
    newTreeElements.delete(num);
    newTreeElements = findParentAndDisconnect(newTreeElements, num);
    return { ...state, treeElements: newTreeElements, selectedNumber: 0 };
  }),
  on(TreesActions.createNewWorkingTree, (state, { kindId }) => ({
    ...state,
    workingTree: generateWorkingTree(kindId),
    treeElements: createNodeLeafObject([createNewNode(1)], []),
  }))
);
