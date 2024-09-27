import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksOrderedListComponent } from './tasks-ordered-list.component';

const routes: Routes = [{ path: '', component: TasksOrderedListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksOrderedListRoutingModule { }
