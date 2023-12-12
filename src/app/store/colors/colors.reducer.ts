import { createReducer, on } from '@ngrx/store';
import { Color } from '../../models/tree.models';
import * as ColorActions from './colors.actions';

export interface ColorState {
  allColors: Color[];
  colorError: string;
  colorLoading: boolean;
}

export const initialColorState: ColorState = {
  allColors: [],
  colorError: '',
  colorLoading: false,
};

export const colorReducer = createReducer(
  initialColorState,
  on(ColorActions.loadColors, (state) => ({
    ...state,
    colorLoading: true,
  })),
  on(ColorActions.loadColorsSuccess, (state, { colors }) => ({
    ...state,
    allColors: colors,
    colorError: '',
    colorLoading: false,
  })),
  on(ColorActions.loadColorsFailure, (state, { error }) => ({
    ...state,
    colorError: error,
    colorLoading: false,
  })),
);
