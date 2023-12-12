import { createSelector } from '@ngrx/store';
import { EditorState } from '../editor.reducer';

export const selectTreeKinds = (state: EditorState) => state.treeKinds;
export const selectAllTreeKinds = createSelector(
  selectTreeKinds,
  (treeKinds) => treeKinds.allTreeKinds,
);
export const selectCurrentTreeKind = createSelector(
  selectTreeKinds,
  (treeKinds) => treeKinds.currentTreeKind,
);
export const selectTreeKindsError = createSelector(
  selectTreeKinds,
  (treeKinds) => treeKinds.treeKindsError,
);
export const selectTreeKindsLoading = createSelector(
  selectTreeKinds,
  (treeKinds) => treeKinds.treeKindsLoading,
);
