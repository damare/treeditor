import { createSelector } from '@ngrx/store';
import { EditorState } from '../editor.reducer';

export const selectDataTypes = (state: EditorState) => state.dataTypes;
export const selectAllDataTypes = createSelector(
  selectDataTypes,
  (dataTypes) => dataTypes.allDataTypes,
);
export const selectDataTypesError = createSelector(
  selectDataTypes,
  (dataTypes) => dataTypes.dataTypesError,
);
export const eslectDataTypesLoading = createSelector(
  selectDataTypes,
  (dataTypes) => dataTypes.dataTypesLoading,
);
