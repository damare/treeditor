import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

import { WorkingNode, WorkingLeaf } from '../models/tree.models';
import { DataType } from '../models/core.models';
import { EditorStoreService } from '../services/editor/editor.service';

export class Polyline {
  points: string;
  fill: string;
  stroke: string;
  strokeWidth: number;

  constructor(
    points?: string,
    fill?: string,
    stroke?: string,
    strokeWidth?: number,
  ) {
    this.points = points || '';
    this.fill = fill || 'none';
    this.stroke = stroke || 'black';
    this.strokeWidth = strokeWidth || 3;
  }
}

@Component({
  selector: 'app-tree-element',
  templateUrl: './tree-element.component.html',
  styleUrls: ['./tree-element.component.css'],
})
export class TreeElementComponent implements OnInit, OnDestroy {
  @Input() currentNodeNum!: number;
  currentNode?: WorkingNode;
  dictionary = new Map<number, WorkingNode | WorkingLeaf>();
  dataTypes = new Map<number, DataType>();
  shouldRedrawLines = false;
  currentDataType?: DataType;
  leftNode?: WorkingNode;
  leftLeaf?: WorkingLeaf;
  rightNode?: WorkingNode;
  rightLeaf?: WorkingLeaf;

  @ViewChild('parent', { read: ElementRef }) parentRef?: ElementRef;
  @ViewChild('leftleaf', { read: ElementRef }) leftLeafRef?: ElementRef;
  @ViewChild('rightleaf', { read: ElementRef }) rightLeafRef?: ElementRef;
  @ViewChild('leftnode', { read: ElementRef }) leftNodeRef?: ElementRef;
  @ViewChild('rightnode', { read: ElementRef }) rightNodeRef?: ElementRef;
  polylines: Polyline[] = [];

  selectedElement = 0;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService
      .selectTreeElements()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((treeDict) => {
        this.dictionary = treeDict;
        this.currentNode = treeDict.get(this.currentNodeNum) as WorkingNode;
        if (this.currentNode) {
          const left = this.dictionary.get(this.currentNode.false_number);
          const right = this.dictionary.get(this.currentNode.true_number);
          this.setSuccessor(left, true);
          this.setSuccessor(right, false);
          this.shouldRedrawLines = true;
        } else {
          console.log('a tree element without something to display ...');
          this.leftNode = undefined;
          this.rightNode = undefined;
          this.leftLeaf = undefined;
          this.leftNode = undefined;
        }
      });
    this.editorStoreService
      .selectDataTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dict) => {
        this.dataTypes = dict;
      });
    window.addEventListener('resize', () => {
      this.drawLines();
    });

    this.editorStoreService
      .selectSelectedNumber()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        this.selectedElement = id;
      });

    interval(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.shouldRedrawLines) {
          // console.log('--- redrawing of node', this.currentNodeNum, '---');
          this.drawLines();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  newLeaf(result: boolean): void {
    this.editorStoreService.addNewLeaf(this.currentNodeNum, result);
  }

  newNode(result: boolean): void {
    this.editorStoreService.addNewNode(this.currentNodeNum, result);
  }

  private setSuccessor(
    successor: WorkingNode | WorkingLeaf | undefined,
    isLeft: boolean,
  ): void {
    if (successor) {
      if ('false_number' in successor) {
        if (isLeft) {
          this.leftNode = successor;
          this.leftLeaf = undefined;
        } else {
          this.rightNode = successor;
          this.rightLeaf = undefined;
        }
      } else {
        if (isLeft) {
          this.leftLeaf = successor;
          this.leftNode = undefined;
        } else {
          this.rightLeaf = successor;
          this.rightNode = undefined;
        }
      }
    } else {
      if (isLeft) {
        this.leftNode = undefined;
        this.leftLeaf = undefined;
      } else {
        this.rightNode = undefined;
        this.rightLeaf = undefined;
      }
    }
  }

  whichDataType(): string {
    if (this.currentNode) {
      const dataType = this.dataTypes.get(this.currentNode.data_type);
      if (dataType) {
        return dataType.name;
      } else {
        return '???';
      }
    } else {
      return '??';
    }
  }

  clickOnParent(): void {
    if (this.currentNode) {
      this.editorStoreService.selectElement(this.currentNode.number);
    }
  }

  clickOnLeaf(leftOrRight: string): void {
    if (leftOrRight == 'left' && this.leftLeaf) {
      this.editorStoreService.selectElement(this.leftLeaf.number);
    } else if (leftOrRight == 'right' && this.rightLeaf) {
      this.editorStoreService.selectElement(this.rightLeaf.number);
    }
  }

  shortenText(text: string): string {
    if (text.startsWith('Herdensanierung')) {
      return 'Herdensan.';
    } else if (text.startsWith('TS')) {
      return 'S TS';
    }
    return text;
  }

  getPosCenter(element: HTMLElement) {
    console.log(element);
    return {
      x: Math.round(element.offsetLeft + element.offsetWidth / 2),
      y: Math.round(element.offsetTop + element.offsetHeight / 2),
    };
  }

  getPosTop(element: HTMLElement) {
    return {
      x: Math.round(element.offsetLeft + element.offsetWidth / 2),
      y: Math.round(element.offsetTop),
    };
  }

  getPos_line_leaf(element: HTMLElement) {
    return {
      x: Math.round(element.offsetLeft + element.offsetWidth / 2),
      y: Math.round(element.offsetTop),
    };
  }

  drawLines() {
    this.polylines = [];
    const polylinesTemp: Polyline[] = [];

    // calculate parent center
    if (this.parentRef) {
      const parent = this.parentRef.nativeElement;
      const posParentCenter = this.getPosCenter(parent);

      // make arrays with leaves and nodes
      const nodesRef: ElementRef[] = [];
      if (this.leftNodeRef?.nativeElement) nodesRef.push(this.leftNodeRef);
      if (this.rightNodeRef?.nativeElement) nodesRef.push(this.rightNodeRef);
      const leavesRef: ElementRef[] = [];
      if (this.leftLeafRef?.nativeElement) leavesRef.push(this.leftLeafRef);
      if (this.rightLeafRef?.nativeElement) leavesRef.push(this.rightLeafRef);

      // one or more leaves
      if (leavesRef.length > 0) {
        for (let i = 0; i < leavesRef.length; i++) {
          const leaf = leavesRef[i]?.nativeElement;
          const posLeafCenter = this.getPosCenter(leaf);

          polylinesTemp.push(
            new Polyline(`${posParentCenter.x}, ${posParentCenter.y}
                        ${posLeafCenter.x}, ${posParentCenter.y}
                        ${posLeafCenter.x}, ${posLeafCenter.y}`),
          );
        }
        if (leavesRef.length === 1 && nodesRef.length === 1) {
          const node = nodesRef[0].nativeElement;
          const posNodeTop = this.getPosTop(node);
          const posParentTop = this.getPosTop(parent);
          polylinesTemp.push(
            new Polyline(`${posParentTop.x}, ${posParentTop.y}
                        ${posNodeTop.x}, ${posNodeTop.y}`),
          );
        }
      }
      // no leaves -> two child nodes
      else {
        for (let i = 0; i < nodesRef.length; i++) {
          const node = nodesRef[i].nativeElement;
          const posNodeTop = this.getPosTop(node);
          polylinesTemp.push(
            new Polyline(`${posParentCenter.x}, ${posParentCenter.y}
                        ${posNodeTop.x}, ${posParentCenter.y}
                        ${posNodeTop.x}, ${posNodeTop.y}`),
          );
        }
      }

      this.shouldRedrawLines = false;
      this.polylines = this.polylines.concat(polylinesTemp);
    }
  }
}
