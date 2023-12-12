import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TreesComponent } from './trees/trees.component';
import { DataTypesComponent } from './data-types/data-types.component';

const routes: Routes = [
  { path: '', redirectTo: '/trees', pathMatch: 'full' },
  { path: 'data-types', component: DataTypesComponent },
  { path: 'trees', component: TreesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
