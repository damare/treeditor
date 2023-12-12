import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreesComponent } from './trees/trees.component';
import { treesReducer } from './store/trees/trees.reducer';
import { FilterTreeKindsPipe } from './pipes/filter-tree-kinds.pipe';
import { NewTreeKindComponent } from './new-tree-kind/new-tree-kind.component';
import { EditorEffects } from './store/editor.effects';
import { treeKindsReducer } from './store/tree-kinds/tree-kinds.reducer';
import { colorReducer } from './store/colors/colors.reducer';
import { dataTypesReducer } from './store/data-types/data-types.reducer';
import { DataTypesComponent } from './data-types/data-types.component';
import { EditorComponent } from './editor/editor.component';
import { TreeDisplayComponent } from './tree-display/tree-display.component';
import { LeafComponent } from './leaf/leaf.component';
import { NodeComponent } from './node/node.component';
import { TreeElementComponent } from './tree-element/tree-element.component';
import { LostElementsComponent } from './lost-elements/lost-elements.component';
import { IsNodePipe } from './pipes/is-node.pipe';
import { ComparisonToSignPipe } from './pipes/comparison-to-sign.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TreesComponent,
    ComparisonToSignPipe,
    FilterTreeKindsPipe,
    IsNodePipe,
    NewTreeKindComponent,
    DataTypesComponent,
    EditorComponent,
    TreeDisplayComponent,
    LeafComponent,
    NodeComponent,
    TreeElementComponent,
    LostElementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    StoreModule.forRoot({
      colors: colorReducer,
      dataTypes: dataTypesReducer,
      treeKinds: treeKindsReducer,
      trees: treesReducer,
    }),
    EffectsModule.forRoot([EditorEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      serialize: {
        options: {
          map: true,
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
