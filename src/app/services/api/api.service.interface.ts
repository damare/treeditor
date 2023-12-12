import { Observable } from 'rxjs';
import {
  Color,
  TreeDisplay,
  TreeKind,
  TreeOut,
  TreeShort,
} from '../../models/tree.models';
import { DataType, WorkingDataType } from '../../models/core.models';

export interface ApiServiceInterface {
  getAllTreeKinds: () => Observable<TreeKind[]>;
  getAllTrees: () => Observable<TreeShort[]>;
  getTree: () => Observable<TreeDisplay>;
  getTreeById: (id: number) => Observable<TreeDisplay>;
  postTree: (tree: TreeOut, isMajor: boolean) => Observable<TreeShort>;
  createNewTreeKind: (
    name: string,
    description: string,
  ) => Observable<TreeKind>;
  createNewDataTyp: (dataType: WorkingDataType) => Observable<DataType>;
  getDataTypes: () => Observable<DataType[]>;
  getColors: () => Observable<Color[]>;
}
