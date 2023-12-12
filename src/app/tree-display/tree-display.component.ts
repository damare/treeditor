import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { WorkingLeaf, WorkingNode, WorkingTree } from '../models/tree.models';
import { EditorStoreService } from '../services/editor/editor.service';

@Component({
  selector: 'app-tree-display',
  templateUrl: './tree-display.component.html',
  styleUrls: ['./tree-display.component.css'],
})
export class TreeDisplayComponent implements OnInit, OnDestroy {
  tree?: WorkingTree;
  dictionary = new Map<number, WorkingNode | WorkingLeaf>();
  root?: WorkingNode;
  selectedNumber = 0;
  selectedNode?: WorkingNode;
  selectedLeaf?: WorkingLeaf;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService
      .selectAllForTreeOut()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((bundle) => {
        this.dictionary = bundle.elements;
        if (bundle.tree) {
          this.root = bundle.elements.get(bundle.tree.root) as WorkingNode;
          this.tree = bundle.tree;
        }
        console.log(this.dictionary);
        console.log(this.root);
        console.log(this.tree);
      });

    this.editorStoreService
      .selectSelectedNumber()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        this.selectedNode = undefined;
        this.selectedLeaf = undefined;
        this.selectedNumber = id;
        const getElement = this.dictionary.get(id);
        if (getElement) {
          if ('false_number' in getElement) {
            this.selectedNode = getElement;
          } else {
            this.selectedLeaf = getElement;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
