import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../services/api/api.service';
import * as ColorsActions from './colors/colors.actions';
import * as DataTypesActions from './data-types/data-types.actions';
import * as TreeKindsActions from './tree-kinds/tree-kinds.actions';
import * as TreesActions from './trees/trees.actions';
import { TreeDisplay, TreeOut } from '../models/tree.models';
import { selectAllForTreeOut } from './trees/trees.selectors';
import { EditorState } from './editor.reducer';

@Injectable()
export class EditorEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<EditorState>,
  ) {}

  createNewTreeKind$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TreeKindsActions.createNewTreeKind),
      mergeMap((action) =>
        this.apiService.createNewTreeKind(action.name, action.description).pipe(
          map((kind) => ({
            type: TreeKindsActions.TreeKindsTypes.CREATE_NEW_TREE_KIND_SUCCESS,
            treeKind: kind,
          })),
          catchError((error) =>
            of({
              type: TreeKindsActions.TreeKindsTypes
                .CREATE_NEW_TREE_KIND_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  getDataTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataTypesActions.loadDataTypes),
      mergeMap(() =>
        this.apiService.getDataTypes().pipe(
          map((types) => ({
            type: DataTypesActions.DataTypesTypes.LOAD_DATATYPES_SUCCESS,
            dataTypes: types,
          })),
          catchError((error) =>
            of({
              type: DataTypesActions.DataTypesTypes.LOAD_DATATYPES_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  getColors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColorsActions.loadColors),
      mergeMap(() =>
        this.apiService.getColors().pipe(
          map((colors) => ({
            type: ColorsActions.ColorTypes.LOAD_COLORS_SUCCESS,
            colors: colors,
          })),
          catchError((error) =>
            of({
              type: ColorsActions.ColorTypes.LOAD_COLORS_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  getAllTreeKinds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TreeKindsActions.loadTreeKinds),
      mergeMap(() =>
        this.apiService.getAllTreeKinds().pipe(
          map((treeKinds) => ({
            type: TreeKindsActions.TreeKindsTypes.LOAD_TREE_KINDS_SUCCESS,
            treeKinds: treeKinds,
          })),
          catchError((error) =>
            of({
              type: TreeKindsActions.TreeKindsTypes.LOAD_TREE_KINDS_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  getAllTrees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TreesActions.loadTrees),
      mergeMap(() =>
        this.apiService.getAllTrees().pipe(
          map((trees) => ({
            type: TreesActions.TreesTypes.LOAD_TREES_SUCCESS,
            trees: trees,
          })),
          catchError((error) =>
            of({
              type: TreesActions.TreesTypes.LOAD_TREES_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  getTreeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TreesActions.loadTreeById),
      mergeMap((action) =>
        this.apiService.getTreeById(action.id).pipe(
          map((tree) => ({
            type: TreesActions.TreesTypes.LOAD_TREE_BY_ID_SUCCESS,
            tree: this.addNumberForSuccessors(tree),
          })),
          catchError((error) =>
            of({
              type: TreesActions.TreesTypes.LOAD_TREE_BY_ID_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  saveTree$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TreesActions.saveTree),
      concatLatestFrom(() => this.store.select(selectAllForTreeOut)),
      mergeMap(([action, data]) => {
        console.log('inside the save tree effect');
        if (data.tree && data.elements.size > 0) {
          console.log('we have some data');
          console.log(data);
          return this.apiService
            .postTree(
              new TreeOut(data.tree, data.elements, action.created_by),
              action.isMajor,
            )
            .pipe(
              map((tree) => ({
                type: TreesActions.TreesTypes.SAVE_TREE_SUCCESS,
                tree: tree,
              })),
              catchError((error) => {
                console.log(error);
                return of({
                  type: TreesActions.TreesTypes.SAVE_TREE_FAILURE,
                  error: error.error,
                });
              }),
            );
        } else {
          return of({
            type: TreesActions.TreesTypes.SAVE_TREE_FAILURE,
            error: 'there was no tree to save.',
          });
        }
      }),
    ),
  );

  createNewDataType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataTypesActions.createNewDataType),
      mergeMap((action) =>
        this.apiService.createNewDataTyp(action.dataType).pipe(
          map((dType) => ({
            type: DataTypesActions.DataTypesTypes.CREATE_NEW_DATATYPE_SUCCESS,
            dataType: dType,
          })),
          catchError((error) =>
            of({
              type: DataTypesActions.DataTypesTypes.CREATE_NEW_DATATYPE_FAILURE,
              error: error,
            }),
          ),
        ),
      ),
    ),
  );

  private takeNumberFromId(id: string): number {
    return Number(id.split('.').reverse()[0]);
  }

  private addNumberForSuccessors(tree: TreeDisplay): TreeDisplay {
    tree.nodes.forEach((node) => {
      node.true_number = this.takeNumberFromId(node.true_id);
      node.false_number = this.takeNumberFromId(node.false_id);
    });
    return tree;
  }
}
