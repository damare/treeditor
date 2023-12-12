import { createAction, props } from '@ngrx/store';
import { TreeKind } from '../../models/tree.models';

export const enum TreeKindsTypes {
  LOAD_TREE_KINDS = '[TreeKinds] Load Tree Kinds',
  LOAD_TREE_KINDS_SUCCESS = '[TreeKinds] Load Tree Kinds Success',
  LOAD_TREE_KINDS_FAILURE = '[TreeKinds] Load Tree Kinds Failure',
  CREATE_NEW_TREE_KIND = '[TreeKinds] Create New Tree Kind',
  CREATE_NEW_TREE_KIND_SUCCESS = '[TreeKinds] Create New Tree Kind Success',
  CREATE_NEW_TREE_KIND_FAILURE = '[TreeKinds] Create New Tree Kind Failure',
}

export const loadTreeKinds = createAction(TreeKindsTypes.LOAD_TREE_KINDS);
export const loadTreeKindsSuccess = createAction(
  TreeKindsTypes.LOAD_TREE_KINDS_SUCCESS,
  props<{ treeKinds: TreeKind[] }>(),
);
export const loadTreeKindsFailure = createAction(
  TreeKindsTypes.LOAD_TREE_KINDS_FAILURE,
  props<{ error: string }>(),
);

export const createNewTreeKind = createAction(
  TreeKindsTypes.CREATE_NEW_TREE_KIND,
  props<{ name: string; description: string }>(),
);
export const createNewTreeKindSuccess = createAction(
  TreeKindsTypes.CREATE_NEW_TREE_KIND_SUCCESS,
  props<{ treeKind: TreeKind }>(),
);
export const createNewTreeKindFailure = createAction(
  TreeKindsTypes.CREATE_NEW_TREE_KIND_FAILURE,
  props<{ error: string }>(),
);
