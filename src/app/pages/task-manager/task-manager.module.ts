import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskManagerComponent } from './task-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskFormComponent } from './task-form/task-form.component';


@NgModule({
  declarations: [
    TaskManagerComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    TaskManagerRoutingModule,
    SharedModule
]
})
export class TaskManagerModule { }
