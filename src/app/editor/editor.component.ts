import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, takeUntil } from 'rxjs';

import { TreeVersion, WorkingTree } from './../models/tree.models';
import { EditorStoreService } from '../services/editor/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public tree!: WorkingTree;
  public version?: TreeVersion;
  public isMajor = false;
  public created_by = '';
  public currentlySaving = false;
  public treesLoading$?: Observable<boolean>;
  public treesError$?: Observable<string>;
  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;

  isNewTree = false;

  treeId = 0; // of the tree

  saveIcon = '\u{0001f4be}';
  backIcon = '\u{00002B10}';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private editorStoreService: EditorStoreService,
  ) {}

  ngOnInit(): void {
    this.getTree();
    this.editorStoreService.getDataTypes();
    this.editorStoreService.getColors();
    this.editorStoreService
      .selectCurrentTreeVersion()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((version) => {
        this.version = version;
      });

    this.editorStoreService
      .selectCurrentTree()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        this.treeId = id;
      });

    this.treesError$ = this.editorStoreService.selectTreesError();
    this.treesLoading$ = this.editorStoreService.selectTreesLoading();

    this.editorStoreService
      .selectTrees()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((trees) => {
        if (trees.length > 0 && this.currentlySaving) {
          this.location.back();
        }
      });

    this.editorStoreService
      .selectWorkingTree()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tree) => {
        if (tree) {
          this.tree = tree;
          this.created_by = tree.created_by;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goBack(): void {
    this.location.back();
  }

  saveTree(): void {
    this.editorStoreService.saveTree(this.isMajor, this.created_by);
    this.currentlySaving = true;
  }

  getTree(): void {
    this.route.paramMap.subscribe((params) => {
      const param = this.route.snapshot.paramMap.get('id');
      if (param === 'new') {
        this.isNewTree = true;
        const kindid = Number(this.route.snapshot.paramMap.get('kindid'));
        this.editorStoreService.createNewWorkingTree(kindid);
      } else {
        this.treeId = Number(param ?? '');
        this.editorStoreService.getTreeById(this.treeId);
      }
    });
  }
}
