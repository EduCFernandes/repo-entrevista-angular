import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/task-manager/task-manager.module').then(m => m.TaskManagerModule) },
  { path: 'list', loadChildren: () => import('./pages/tasks-ordered-list/tasks-ordered-list.module').then(m => m.TasksOrderedListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LocationStrategy, useClass:  HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
