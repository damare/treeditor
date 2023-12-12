import { createReducer, on } from '@ngrx/store';
import { TreeKind } from '../../models/tree.models';
import * as TreeKindsActions from './tree-kinds.actions';

export interface TreeKindsState {
  currentTreeKind: number;
  allTreeKinds: TreeKind[];
  treeKindsError: string;
  treeKindsLoading: boolean;
}

export const initialTreeKindsState: TreeKindsState = {
  currentTreeKind: 0,
  allTreeKinds: [],
  treeKindsError: '',
  treeKindsLoading: false,
};

export const treeKindsReducer = createReducer(
  initialTreeKindsState,
  on(TreeKindsActions.createNewTreeKindSuccess, (state, { treeKind }) => ({
    ...state,
    allTreeKinds: [...state.allTreeKinds, treeKind],
    treeKindsError: '',
    treeKindsLoading: false,
  })),
  on(TreeKindsActions.loadTreeKinds, (state) => ({
    ...state,
    treeKindsLoading: true,
  })),
  on(TreeKindsActions.loadTreeKindsSuccess, (state, { treeKinds }) => ({
    ...state,
    allTreeKinds: treeKinds,
    treeKindsError: '',
    treeKindsLoading: false,
  })),
  on(TreeKindsActions.loadTreeKindsFailure, (state, { error }) => ({
    ...state,
    error: error,
    treeKindsLoading: false,
  })),
);
