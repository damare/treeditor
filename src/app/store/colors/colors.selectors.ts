import { createSelector } from '@ngrx/store';
import { EditorState } from '../editor.reducer';

export const selectColors = (state: EditorState) => state.colors;
export const selectAllColors = createSelector(
  selectColors,
  (colors) => colors.allColors,
);
export const selectColorError = createSelector(
  selectColors,
  (colors) => colors.colorError,
);
export const selectColorLoading = createSelector(
  selectColors,
  (colors) => colors.colorLoading,
);
