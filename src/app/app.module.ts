import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

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
import { HttpClientModule } from '@angular/common/http';
import { treeKindsReducer } from './store/tree-kinds/tree-kinds.reducer';
import { colorReducer } from './store/colors/colors.reducer';
import { dataTypesReducer } from './store/data-types/data-types.reducer';
import { DataTypesComponent } from './data-types/data-types.component';

@NgModule({
  declarations: [
    AppComponent,
    TreesComponent,
    FilterTreeKindsPipe,
    NewTreeKindComponent,
    DataTypesComponent,
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
