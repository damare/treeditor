import { ColorState, initialColorState } from './colors/colors.reducer';
import {
  DataTypesState,
  initialDataTypesState,
} from './data-types/data-types.reducer';
import {
  TreeKindsState,
  initialTreeKindsState,
} from './tree-kinds/tree-kinds.reducer';
import { TreesState, initialTreesState } from './trees/trees.reducer';

export interface EditorState {
  colors: ColorState;
  dataTypes: DataTypesState;
  treeKinds: TreeKindsState;
  trees: TreesState;
}

export const initialState: EditorState = {
  colors: initialColorState,
  dataTypes: initialDataTypesState,
  treeKinds: initialTreeKindsState,
  trees: initialTreesState,
};
