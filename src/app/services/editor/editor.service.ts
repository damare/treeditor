import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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
import { ColorTypes } from '../../store/colors/colors.actions';
import * as fromColors from '../../store/colors/colors.selectors';
import { DataTypesTypes } from '../../store/data-types/data-types.actions';
import * as fromDataTypes from '../../store/data-types/data-types.selectors';
import { TreeKindsTypes } from '../../store/tree-kinds/tree-kinds.actions';
import * as fromTreeKinds from '../../store/tree-kinds/tree-kinds.selectors';
import { TreesTypes } from '../../store/trees/trees.actions';
import * as fromTrees from '../../store/trees/trees.selectors';
import { EditorStoreServiceInterface } from './editor.service.interface';
import { EditorState } from '../../store/editor.reducer';

@Injectable({
  providedIn: 'root',
})
export class EditorStoreService implements EditorStoreServiceInterface {
  constructor(private store: Store<EditorState>) {}

  // === COLORS actions ===
  getColors(): void {
    this.store.dispatch({ type: ColorTypes.LOAD_COLORS });
  }
  // === COLORS selectors ===
  selectColors(): Observable<Color[]> {
    return this.store.select(fromColors.selectAllColors);
  }
  selectColorsError(): Observable<string> {
    return this.store.select(fromColors.selectColorError);
  }
  selectColorsLoading(): Observable<boolean> {
    return this.store.select(fromColors.selectColorLoading);
  }

  // === DATA TYPES actions ===
  getDataTypes(): void {
    this.store.dispatch({ type: DataTypesTypes.LOAD_DATATYPES });
  }
  createNewDataType(dataType: WorkingDataType): void {
    this.store.dispatch({
      type: DataTypesTypes.CREATE_NEW_DATATYPE,
      dataType: dataType,
    });
  }
  // === DATA TYPES selectors ===
  selectDataTypes(): Observable<Map<number, DataType>> {
    return this.store.select(fromDataTypes.selectAllDataTypes);
  }
  selectDataTypesError(): Observable<string> {
    return this.store.select(fromDataTypes.selectDataTypesError);
  }
  selectDataTypesLoading(): Observable<boolean> {
    return this.store.select(fromDataTypes.eslectDataTypesLoading);
  }

  // === TREE KINDS actions ===
  getTreeKinds(): void {
    this.store.dispatch({ type: TreeKindsTypes.LOAD_TREE_KINDS });
  }
  createNewTreeKind(name: string, description: string): void {
    this.store.dispatch({
      type: TreeKindsTypes.CREATE_NEW_TREE_KIND,
      name: name,
      description: description,
    });
  }
  // === TREE KINDS selectors ===
  selectTreeKinds(): Observable<TreeKind[]> {
    return this.store.select(fromTreeKinds.selectAllTreeKinds);
  }
  selectTreeKindsError(): Observable<string> {
    return this.store.select(fromTreeKinds.selectTreeKindsError);
  }
  selectTreeKindsLoading(): Observable<boolean> {
    return this.store.select(fromTreeKinds.selectTreeKindsLoading);
  }

  // === TREES actions ===
  getTrees(): void {
    this.store.dispatch({ type: TreesTypes.LOAD_TREES });
  }
  getTreeById(id: number): void {
    this.store.dispatch({ type: TreesTypes.LOAD_TREE_BY_ID, id: id });
  }
  selectElement(number: number): void {
    this.store.dispatch({
      type: TreesTypes.SELECT_ELEMENT,
      selectedNumber: number,
    });
  }
  unselectElement(): void {
    this.store.dispatch({ type: TreesTypes.UNSELECT_ELEMENT });
  }
  createNewWorkingTree(kindId: number): void {
    this.store.dispatch({
      type: TreesTypes.CREATE_NEW_WORKING_TREE,
      kindId: kindId,
    });
  }
  updateNode(node: WorkingNode): void {
    this.store.dispatch({
      type: TreesTypes.UPDATE_NODE,
      node: node,
    });
  }
  updateLeaf(leaf: WorkingLeaf): void {
    this.store.dispatch({
      type: TreesTypes.UPDATE_LEAF,
      leaf: leaf,
    });
  }
  addNewLeaf(parentNum: number, result: boolean): void {
    this.store.dispatch({
      type: TreesTypes.ADD_NEW_LEAF,
      parentNum: parentNum,
      result: result,
    });
  }
  addNewNode(parentNum: number, result: boolean): void {
    this.store.dispatch({
      type: TreesTypes.ADD_NEW_NODE,
      parentNum: parentNum,
      result: result,
    });
  }
  changeLeafToNode(num: number): void {
    this.store.dispatch({
      type: TreesTypes.CHANGE_LEAF_TO_NODE,
      num: num,
    });
  }
  changeNodeToLeaf(num: number): void {
    this.store.dispatch({
      type: TreesTypes.CHANGE_NODE_TO_LEAF,
      num: num,
    });
  }
  deleteLeaf(num: number): void {
    this.store.dispatch({
      type: TreesTypes.DELETE_LEAF,
      num: num,
    });
  }
  deleteNode(num: number): void {
    this.store.dispatch({
      type: TreesTypes.DELETE_NODE,
      num: num,
    });
  }
  saveTree(isMajor: boolean, created_by: string | undefined): void {
    this.store.dispatch({
      type: TreesTypes.SAVE_TREE,
      isMajor: isMajor,
      created_by: created_by,
    });
  }

  // === TREES selectors ===
  selectTrees(): Observable<TreeShort[]> {
    return this.store.select(fromTrees.selectAllTrees);
  }
  selectCurrentTree(): Observable<number> {
    return this.store.select(fromTrees.selectCurrentTree);
  }
  selectTreesError(): Observable<string> {
    return this.store.select(fromTrees.selectTreesError);
  }
  selectTreesLoading(): Observable<boolean> {
    return this.store.select(fromTrees.selectTreesLoading);
  }
  selectWorkingTree(): Observable<WorkingTree | undefined> {
    return this.store.select(fromTrees.selectWorkingTree);
  }
  selectLostElements(): Observable<Map<number, WorkingNode | WorkingLeaf>> {
    return this.store.select(fromTrees.selectLostElements);
  }
  selectTreeElements(): Observable<Map<number, WorkingNode | WorkingLeaf>> {
    return this.store.select(fromTrees.selectTreeElements);
  }
  selectSelectedNumber(): Observable<number> {
    return this.store.select(fromTrees.selectSelectedNumber);
  }
  selectSelectedNode(): Observable<WorkingNode | undefined> {
    return this.store.select(fromTrees.selectSelectedNode);
  }
  selectSelectedLeaf(): Observable<WorkingLeaf | undefined> {
    return this.store.select(fromTrees.selectSelectedLeaf);
  }
  selectTreeElementByNumber(
    elemNum: number,
  ): Observable<WorkingNode | WorkingLeaf | undefined> {
    return this.store.select(fromTrees.selectTreeElementByNumber(elemNum));
  }
  selectPossibleSuccessors(): Observable<[number, string][]> {
    return this.store.select(fromTrees.selectPossibleSuccessors);
  }
  selectAllForTreeOut(): Observable<{
    tree?: WorkingTree;
    elements: Map<number, WorkingNode | WorkingLeaf>;
  }> {
    return this.store.select(fromTrees.selectAllForTreeOut);
  }
  selectCurrentTreeVersion(): Observable<TreeVersion | undefined> {
    return this.store.select(fromTrees.selectCurrentTreeVersion);
  }
  selectWorkingTreeError(): Observable<string> {
    return this.store.select(fromTrees.selectWorkingTreeError);
  }
  selectWorkingTreeLoading(): Observable<boolean> {
    return this.store.select(fromTrees.selectWorkingTreeLoading);
  }
}
