import { Observable } from 'rxjs';
import {
  Color,
  TreeKind,
  TreeShort,
  TreeVersion,
  WorkingLeaf,
  WorkingNode,
  WorkingTree,
} from '../../models/tree.models';
import { DataType, WorkingDataType } from '../../models/core.models';

export interface EditorStoreServiceInterface {
  // === COLORS actions ===
  getColors: () => void;
  // === COLORS selectors ===
  selectColors: () => Observable<Color[]>;
  selectColorsError: () => Observable<string>;
  selectColorsLoading: () => Observable<boolean>;

  // === DATA TYPES actions ===
  getDataTypes: () => void;
  createNewDataType: (dataType: WorkingDataType) => void;
  // === DATA TYPES selectors ===
  selectDataTypes: () => Observable<Map<number, DataType>>;
  selectDataTypesError: () => Observable<string>;
  selectDataTypesLoading: () => Observable<boolean>;

  // === TREE KINDS actions ===
  getTreeKinds: () => void;
  createNewTreeKind: (name: string, description: string) => void;
  // === TREE KINDS selectors ===
  selectTreeKinds: () => Observable<TreeKind[]>;
  selectTreeKindsError: () => Observable<string>;
  selectTreeKindsLoading: () => Observable<boolean>;

  // === TREES actions ===
  getTrees: () => void;
  getTreeById: (id: number) => void;
  selectElement: (number: number) => void;
  unselectElement: () => void;
  createNewWorkingTree: (kindId: number) => void;
  addNewLeaf: (parentNum: number, result: boolean) => void;
  addNewNode: (parentNum: number, result: boolean) => void;
  changeLeafToNode: (num: number) => void;
  changeNodeToLeaf: (num: number) => void;
  deleteLeaf: (num: number) => void;
  deleteNode: (num: number) => void;
  updateNode: (node: WorkingNode) => void;
  updateLeaf: (leaf: WorkingLeaf) => void;
  saveTree: (isMajor: boolean, created_by: string | undefined) => void;
  // === TREES selectors ===
  selectTrees: () => Observable<TreeShort[]>;
  selectCurrentTree: () => Observable<number>;
  selectTreesError: () => Observable<string>;
  selectTreesLoading: () => Observable<boolean>;
  selectWorkingTree: () => Observable<WorkingTree | undefined>;
  selectLostElements: () => Observable<Map<number, WorkingNode | WorkingLeaf>>;
  selectTreeElements: () => Observable<Map<number, WorkingNode | WorkingLeaf>>;
  selectSelectedNumber: () => Observable<number>;
  selectSelectedNode: () => Observable<WorkingNode | undefined>;
  selectSelectedLeaf: () => Observable<WorkingLeaf | undefined>;
  selectTreeElementByNumber: (
    elemNum: number,
  ) => Observable<WorkingNode | WorkingLeaf | undefined>;
  selectPossibleSuccessors: () => Observable<[number, string][]>;
  selectAllForTreeOut: () => Observable<{
    tree?: WorkingTree;
    elements: Map<number, WorkingNode | WorkingLeaf>;
  }>;
  selectCurrentTreeVersion: () => Observable<TreeVersion | undefined>;
  selectWorkingTreeError: () => Observable<string>;
  selectWorkingTreeLoading: () => Observable<boolean>;
}
