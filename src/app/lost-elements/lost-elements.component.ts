import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditorStoreService } from '../services/editor/editor.service';
import { Subject, takeUntil } from 'rxjs';
import { WorkingLeaf, WorkingNode } from '../models/tree.models';

@Component({
  selector: 'app-lost-elements',
  templateUrl: './lost-elements.component.html',
  styleUrls: ['./lost-elements.component.css'],
})
export class LostElementsComponent implements OnInit, OnDestroy {
  lostElements: Map<number, WorkingNode | WorkingLeaf> = new Map<
    number,
    WorkingNode | WorkingLeaf
  >();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService
      .selectLostElements()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((elements) => {
        this.lostElements = elements;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
