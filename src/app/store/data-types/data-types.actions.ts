import { createAction, props } from '@ngrx/store';
import { DataType, WorkingDataType } from '../../models/core.models';

export const enum DataTypesTypes {
  LOAD_DATATYPES = '[DataTypes] Load Data Types',
  LOAD_DATATYPES_SUCCESS = '[DataTypes] Load Data Types Success',
  LOAD_DATATYPES_FAILURE = '[DataTypes] Load Data Types Failure',
  CREATE_NEW_DATATYPE = '[DataTypes] Create New Data Type',
  CREATE_NEW_DATATYPE_SUCCESS = '[DataTypes] Create New Data Type Success',
  CREATE_NEW_DATATYPE_FAILURE = '[DataTypes] Create New Data Type Failure',
}

export const loadDataTypes = createAction(DataTypesTypes.LOAD_DATATYPES);
export const loadDataTypesSuccess = createAction(
  DataTypesTypes.LOAD_DATATYPES_SUCCESS,
  props<{ dataTypes: DataType[] }>(),
);
export const loadDataTypesFailure = createAction(
  DataTypesTypes.LOAD_DATATYPES_FAILURE,
  props<{ error: string }>(),
);

export const createNewDataType = createAction(
  DataTypesTypes.CREATE_NEW_DATATYPE,
  props<{ dataType: WorkingDataType }>(),
);
export const createNewDataTypeSuccess = createAction(
  DataTypesTypes.CREATE_NEW_DATATYPE_SUCCESS,
  props<{ dataType: DataType }>(),
);
export const createNewDataTypeFailure = createAction(
  DataTypesTypes.CREATE_NEW_DATATYPE_FAILURE,
  props<{ error: string }>(),
);
