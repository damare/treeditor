import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditorStoreService } from '../services/editor/editor.service';
import { DataType, WorkingDataType } from '../models/core.models';
import { Subject, takeUntil } from 'rxjs';

interface DataOptions {
  [key: string]: string;
}

@Component({
  selector: 'app-data-types',
  templateUrl: './data-types.component.html',
  styleUrls: ['./data-types.component.css'],
})
export class DataTypesComponent implements OnInit, OnDestroy {
  public dataTypes: Map<number, DataType> = new Map<number, DataType>();
  model: WorkingDataType = {
    name: '',
    display_name: '',
    explanation: '',
    kind_of_data: '',
  };
  dataOptions: DataOptions = {
    INT: 'Integer / Zahl',
    BOOL: 'Boolean / Ja-oder-Nein',
    STR: 'Text',
  };

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private editorStoreService: EditorStoreService) {}

  ngOnInit(): void {
    this.editorStoreService.getDataTypes();
    this.editorStoreService
      .selectDataTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((dTypes) => {
        this.dataTypes = dTypes;
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(newDataTypeForm: { value: WorkingDataType }) {
    this.editorStoreService.createNewDataType(newDataTypeForm.value);
  }
}
