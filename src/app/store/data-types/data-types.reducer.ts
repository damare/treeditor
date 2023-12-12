import { createReducer, on } from '@ngrx/store';
import { DataType } from '../../models/core.models';
import * as DataTypesActions from './data-types.actions';

export interface DataTypesState {
  allDataTypes: Map<number, DataType>;
  dataTypesError: string;
  dataTypesLoading: boolean;
}

export const initialDataTypesState: DataTypesState = {
  allDataTypes: new Map<number, DataType>(),
  dataTypesError: '',
  dataTypesLoading: false,
};

function createDataTypeDict(dataTypes: DataType[]): Map<number, DataType> {
  const temp = new Map<number, DataType>();
  if (dataTypes) {
    dataTypes.forEach((element) => {
      temp.set(element.id, element);
    });
  }
  return temp;
}

export const dataTypesReducer = createReducer(
  initialDataTypesState,
  on(DataTypesActions.loadDataTypes, (state) => ({
    ...state,
    dataTypesLoading: true,
  })),
  on(DataTypesActions.loadDataTypesSuccess, (state, { dataTypes }) => ({
    ...state,
    allDataTypes: createDataTypeDict(dataTypes),
    dataTypesError: '',
    dataTypesLoading: false,
  })),
  on(DataTypesActions.loadDataTypesFailure, (state, { error }) => ({
    ...state,
    allDataTypes: new Map<number, DataType>(),
    dataTypesError: error,
    dataTypesLoading: false,
  })),
  on(DataTypesActions.createNewDataType, (state, { dataType }) => ({
    ...state,
    dataTypesLoading: true,
  })),
  on(DataTypesActions.createNewDataTypeSuccess, (state, { dataType }) => ({
    ...state,
    allDataTypes: new Map<number, DataType>(state.allDataTypes).set(
      dataType.id,
      dataType,
    ),
    dataTypesError: '',
    dataTypesLoading: false,
  })),
  on(DataTypesActions.createNewDataTypeFailure, (state, { error }) => ({
    ...state,
    dataTypesError: error,
    dataTypesLoading: false,
  })),
);
