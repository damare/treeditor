import { createAction, props } from '@ngrx/store';
import {
  TreeDisplay,
  TreeShort,
  WorkingLeaf,
  WorkingNode,
} from '../../models/tree.models';

export const enum TreesTypes {
  LOAD_TREES = '[Trees] Load Trees',
  LOAD_TREES_SUCCESS = '[Trees] Load Trees Success',
  LOAD_TREES_FAILURE = '[Trees] Load Trees Failure',
  LOAD_TREE_BY_ID = '[Trees] Load Tree By Id',
  LOAD_TREE_BY_ID_SUCCESS = '[Trees] Load Tree By Id Success',
  LOAD_TREE_BY_ID_FAILURE = '[Trees] Load Tree By Id Failure',
  SELECT_ELEMENT = '[Trees] Select Element',
  UNSELECT_ELEMENT = '[Trees] Unselect Element',
  UPDATE_NODE = '[Trees] Update Node',
  UPDATE_LEAF = '[Trees] Update Leaf',
  CREATE_NEW_WORKING_TREE = '[Trees] Create New Working Tree',
  ADD_NEW_LEAF = '[Trees] Add New Leaf',
  ADD_NEW_NODE = '[Trees] Add New Node',
  CHANGE_LEAF_TO_NODE = '[Trees] Change Leaf To Node',
  CHANGE_NODE_TO_LEAF = '[Trees] Change Node To Leaf',
  DELETE_LEAF = '[Trees] Delete Leaf',
  DELETE_NODE = '[Trees] Delete Node',
  SAVE_TREE = '[Trees] Save Tree',
  SAVE_TREE_SUCCESS = '[Trees] Save Tree Success',
  SAVE_TREE_FAILURE = '[Trees] Save Tree Failure',
}

export const loadTrees = createAction(TreesTypes.LOAD_TREES);
export const loadTreesSuccess = createAction(
  TreesTypes.LOAD_TREES_SUCCESS,
  props<{ trees: TreeShort[] }>()
);
export const loadTreesFailure = createAction(
  TreesTypes.LOAD_TREES_FAILURE,
  props<{ error: string }>()
);

export const updateNode = createAction(
  TreesTypes.UPDATE_NODE,
  props<{ node: WorkingNode }>()
);
export const updateLeaf = createAction(
  TreesTypes.UPDATE_LEAF,
  props<{ leaf: WorkingLeaf }>()
);

export const loadTreeById = createAction(
  TreesTypes.LOAD_TREE_BY_ID,
  props<{ id: number }>()
);
export const loadTreeByIdSuccess = createAction(
  TreesTypes.LOAD_TREE_BY_ID_SUCCESS,
  props<{ tree: TreeDisplay }>()
);
export const loadTreeByIdFailure = createAction(
  TreesTypes.LOAD_TREE_BY_ID_FAILURE,
  props<{ error: string }>()
);

export const selectElement = createAction(
  TreesTypes.SELECT_ELEMENT,
  props<{ selectedNumber: number }>()
);
export const unselectElement = createAction(TreesTypes.UNSELECT_ELEMENT);

export const createNewWorkingTree = createAction(
  TreesTypes.CREATE_NEW_WORKING_TREE,
  props<{ kindId: number }>()
);

export const addNewLeaf = createAction(
  TreesTypes.ADD_NEW_LEAF,
  props<{ parentNum: number; result: boolean }>()
);
export const addNewNode = createAction(
  TreesTypes.ADD_NEW_NODE,
  props<{ parentNum: number; result: boolean }>()
);
export const changeLeafToNode = createAction(
  TreesTypes.CHANGE_LEAF_TO_NODE,
  props<{ num: number }>()
);
export const changeNodeToLeaf = createAction(
  TreesTypes.CHANGE_NODE_TO_LEAF,
  props<{ num: number }>()
);
export const deleteLeaf = createAction(
  TreesTypes.DELETE_LEAF,
  props<{ num: number }>()
);
export const deleteNode = createAction(
  TreesTypes.DELETE_NODE,
  props<{ num: number }>()
);
export const saveTree = createAction(
  TreesTypes.SAVE_TREE,
  props<{ isMajor: boolean; created_by: string | undefined }>()
);
export const saveTreeSuccess = createAction(
  TreesTypes.SAVE_TREE_SUCCESS,
  props<{ tree: TreeShort }>()
);
export const saveTreeFailure = createAction(
  TreesTypes.SAVE_TREE_FAILURE,
  props<{ error: string }>()
);
