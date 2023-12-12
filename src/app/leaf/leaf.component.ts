import { Component, OnDestroy, OnInit } from '@angular/core';

import { EditorStoreService } from '../services/editor/editor.service';
import { Color, WorkingLeaf } from '../models/tree.models';
import { Observable, Subject, takeUntil } from 'rxjs';

interface BoolChoice {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-leaf',
  templateUrl: './leaf.component.html',
  styleUrls: ['./leaf.component.css'],
})
export class LeafComponent implements OnInit, OnDestroy {
  leaf?: WorkingLeaf;
  colors?: Observable<Color[]>;

  boolChoice: BoolChoice[] = [
    { value: true, viewValue: 'true' },
    { value: false, viewValue: 'false' },
  ];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService
      .selectSelectedLeaf()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((leaf) => {
        this.leaf = leaf;
      });
    this.colors = this.editorStoreService.selectColors();
  }

  onChangeLeafToNode(): void {
    if (this.leaf) {
      this.editorStoreService.changeLeafToNode(this.leaf.number);
    }
  }

  onDeleteLeaf(): void {
    if (this.leaf) {
      this.editorStoreService.deleteLeaf(this.leaf.number);
    }
  }
  onLeafResultChange($event: boolean) {
    if (this.leaf) {
      this.editorStoreService.updateLeaf({ ...this.leaf, result: $event });
    } else {
      console.log('no leaf to change!');
    }
  }
  onLeafColorChange($event: number) {
    if (this.leaf) {
      this.editorStoreService.updateLeaf({ ...this.leaf, color: $event });
    } else {
      console.log('no leaf to change!');
    }
  }
  onLeafDisplayNameChange($event: string) {
    if (this.leaf) {
      this.editorStoreService.updateLeaf({
        ...this.leaf,
        display_name: $event,
      });
    } else {
      console.log('no leaf to change!');
    }
  }

  closeCard(): void {
    this.editorStoreService.unselectElement();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
