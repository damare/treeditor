import { createAction, props } from '@ngrx/store';
import { Color } from 'src/app/models/tree.models';

export const enum ColorTypes {
  LOAD_COLORS = '[Color] Load Colors',
  LOAD_COLORS_SUCCESS = '[Color] Load Colors Success',
  LOAD_COLORS_FAILURE = '[Color] Load Colors Failure',
}

export const loadColors = createAction(ColorTypes.LOAD_COLORS);
export const loadColorsSuccess = createAction(
  ColorTypes.LOAD_COLORS_SUCCESS,
  props<{ colors: Color[] }>(),
);
export const loadColorsFailure = createAction(
  ColorTypes.LOAD_COLORS_FAILURE,
  props<{ error: string }>(),
);
