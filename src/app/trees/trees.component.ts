import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { TreeKind, TreeShort } from '../models/tree.models';
import { EditorStoreService } from '../services/editor/editor.service';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.css'],
})
export class TreesComponent implements OnInit, OnDestroy {
  title = 'editor';

  trees: TreeShort[] = [];
  treeKinds: TreeKind[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService.getTreeKinds();
    this.editorStoreService
      .selectTreeKinds()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tree_kinds) => {
        this.treeKinds = tree_kinds;
      });
    this.editorStoreService.getTrees();
    this.editorStoreService
      .selectTrees()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((trees) => {
        this.trees = trees;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onGoToNewTree(kindId: number): void {
    this.editorStoreService.createNewWorkingTree(kindId);
  }
}
