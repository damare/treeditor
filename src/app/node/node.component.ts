import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

import { EditorStoreService } from '../services/editor/editor.service';
import { Color, WorkingNode } from '../models/tree.models';
import { DataType } from '../models/core.models';

interface ComparisonChoice {
  value: string;
  viewValue: string;
}

interface ListComparisonChoice {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
})
export class NodeComponent implements OnInit, OnDestroy {
  node?: WorkingNode;
  dataTypes = new Map<number, DataType>();
  colors?: Observable<Color[]>;
  successors?: Observable<[number, string][]>;

  comparisonChoice: ComparisonChoice[] = [
    { value: 'GT', viewValue: 'größer als (>)' },
    { value: 'ST', viewValue: 'kleiner als (<)' },
    { value: 'EQ', viewValue: 'ist gleich (=)' },
    { value: 'NE', viewValue: 'ist nicht gleich (!=)' },
  ];

  listComparisonChoice: ListComparisonChoice[] = [
    { value: 'ALL', viewValue: 'all fields' },
    { value: 'ONE', viewValue: 'one field' },
    { value: 'TWO', viewValue: 'two fields' },
  ];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService
      .selectSelectedNode()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((node) => {
        this.node = node;
      });
    this.editorStoreService
      .selectDataTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dataTypes) => {
        this.dataTypes = dataTypes;
      });
    this.successors = this.editorStoreService.selectPossibleSuccessors();
    this.colors = this.editorStoreService.selectColors();
  }

  onNodeDelete() {
    if (this.node) {
      this.editorStoreService.deleteNode(this.node.number);
    }
  }

  onChangeNodeToLeaf() {
    if (this.node) {
      this.editorStoreService.changeNodeToLeaf(this.node.number);
    }
  }

  onNodeNameChange(newName: string) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        display_name: newName,
      });
    }
    console.log(newName);
  }

  onNodeDescriptionChange(description: string) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        description: description,
      });
    }
  }

  onNodeComparisonChange(comparison: string) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        comparison: comparison,
      });
    }
  }

  onNodeDataTypeChange(datatype: number) {
    if (this.node) {
      this.editorStoreService.updateNode({ ...this.node, data_type: datatype });
    }
  }
  onNodeDataValueChange(value: any) {
    if (this.node) {
      this.editorStoreService.updateNode({ ...this.node, data_value: value });
    }
  }
  onNodeExplanationChange(explanation: string) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        explanation: explanation,
      });
    }
  }
  onNodeTrueSuccChange(trueSuccessor: number) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        true_number: Number(trueSuccessor),
      });
    }
  }
  onNodeTrueExplanationChange(trueExplanation: string) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        true_explanation: trueExplanation,
      });
    }
  }
  onNodeTrueColorChange(color: number) {
    if (this.node) {
      this.editorStoreService.updateNode({ ...this.node, true_color: color });
    }
  }
  onNodeFalseSuccChange(falseSuccessor: number) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        false_number: Number(falseSuccessor),
      });
    }
  }
  onNodeFalseExplanationChange(falseExplanation: string) {
    if (this.node) {
      this.editorStoreService.updateNode({
        ...this.node,
        false_explanation: falseExplanation,
      });
    }
  }
  onNodeFalseColorChange(color: number) {
    if (this.node) {
      this.editorStoreService.updateNode({ ...this.node, false_color: color });
    }
  }

  public closeCard(): void {
    this.editorStoreService.unselectElement();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
