import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksOrderedListRoutingModule } from './tasks-ordered-list-routing.module';
import { TasksOrderedListComponent } from './tasks-ordered-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TasksOrderedListComponent
  ],
  imports: [
    CommonModule,
    TasksOrderedListRoutingModule,
    SharedModule
  ]
})
export class TasksOrderedListModule { }
