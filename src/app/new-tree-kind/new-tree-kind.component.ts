import { Component } from '@angular/core';
import { EditorStoreService } from '../services/editor/editor.service';

@Component({
  selector: 'app-new-tree-kind',
  templateUrl: './new-tree-kind.component.html',
  styleUrls: ['./new-tree-kind.component.css'],
})
export class NewTreeKindComponent {
  model = { name: '', description: '' };

  constructor(private editorService: EditorStoreService) {}

  onSubmit(newTreeKindForm: { value: { name: string; description: string } }) {
    this.editorService.createNewTreeKind(
      newTreeKindForm.value.name,
      newTreeKindForm.value.description,
    );
  }
}
